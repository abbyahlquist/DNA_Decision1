/////////////////////////
// DNA Decisions Game //
/////////////////////////

// Game state variables
let speciesList = ["Coral", "Wolf", "Dolphin"];
let currentSpecies = 0;
let year = 1;
let population = 100;
let diversity = 1.0; // 0–1
let inbreeding = 0.0; // 0–1

// Events
const events = [
    {
        text: "A disease outbreak occurs. What should you do?",
        choices: [
            { text: "Isolate sick individuals and vaccinate the population.", good: true },
            { text: "Ignore it and hope it passes naturally.", good: false },
            { text: "Introduce more predators to reduce disease.", good: false }
        ]
    },
    {
        text: "Habitat is being destroyed. How do you respond?",
        choices: [
            { text: "Move part of the population to a protected area.", good: true },
            { text: "Do nothing.", good: false },
            { text: "Relocate humans instead.", good: false }
        ]
    },
    {
        text: "Genetic diversity is dropping. Your action?",
        choices: [
            { text: "Introduce individuals from a different population.", good: true },
            { text: "Breed only within current population.", good: false },
            { text: "Prevent all breeding.", good: false }
        ]
    },
    {
        text: "Poaching is increasing. Your response?",
        choices: [
            { text: "Increase ranger patrols and enforce laws.", good: true },
            { text: "Ignore poaching to save money.", good: false },
            { text: "Encourage hunting for tourism.", good: false }
        ]
    },
    {
        text: "Food resources are limited. What do you do?",
        choices: [
            { text: "Supplement diet with safe additional resources.", good: true },
            { text: "Let them starve naturally.", good: false },
            { text: "Relocate predators to reduce competition.", good: false }
        ]
    }
];

// Current event
let currentEvent;

// Random event
function randomEvent() {
    return events[Math.floor(Math.random() * events.length)];
}

// Update display
function updateDisplay(event) {
    document.getElementById("species").innerText = speciesList[currentSpecies];
    document.getElementById("year").innerText = year;
    document.getElementById("population").innerText = Math.round(population);
    document.getElementById("diversity").innerText = diversity.toFixed(2);
    document.getElementById("inbreeding").innerText = inbreeding.toFixed(2);

    if (event) {
        let eventEl = document.getElementById("event");
        eventEl.innerText = event.text;
        eventEl.classList.add("animate__animated", "animate__fadeIn");
        setTimeout(() => eventEl.classList.remove("animate__animated", "animate__fadeIn"), 500);

        document.querySelectorAll(".btn-light").forEach((btn, index) => {
            btn.innerText = event.choices[index].text;
        });

        document.getElementById("result").innerText = ""; // clear previous insight
    }

    // Update progress bars with animation
    document.getElementById("popBar").style.width = Math.round(population) + "%";
    document.getElementById("divBar").style.width = Math.round(diversity*100) + "%";
    document.getElementById("inbreedBar").style.width = Math.round(inbreeding*100) + "%";
}

// Handle choice
function handleChoice(choiceIndex, event) {
    const choice = event.choices[choiceIndex];

    // Adjust stats
    if (choice.good) {
        population += 10;
        diversity += 0.05;
        inbreeding -= 0.05;
        document.getElementById("result").innerText = "Good conservation decision!";
    } else {
        population -= 15;
        diversity -= 0.05;
        inbreeding += 0.05;
        document.getElementById("result").innerText = "Risky conservation decision!";
    }

    // Clamp
    population = Math.max(0, population);
    diversity = Math.min(1, Math.max(0, diversity));
    inbreeding = Math.min(1, Math.max(0, inbreeding));

    year++;
    checkGameState();
}

// Choice functions
function choiceA() { handleChoice(0, currentEvent); }
function choiceB() { handleChoice(1, currentEvent); }
function choiceC() { handleChoice(2, currentEvent); }

// Game progression
function resetLevel() {
    year = 1;
    population = 100;
    diversity = 1.0;
    inbreeding = 0.0;
    nextEvent();
}

function nextEvent() {
    currentEvent = randomEvent();
    updateDisplay(currentEvent);
}

// Check win/lose
function checkGameState() {
    if (population <= 0 || diversity <= 0.2 || inbreeding >= 0.5) {
        showLose();
        return;
    }

    if (year > 10) {
        currentSpecies++;
        if (currentSpecies >= speciesList.length) {
            showWin();
            return;
        } else {
            alert("New species unlocked!");
            resetLevel();
        }
    } else {
        nextEvent();
    }
}

// Page management
function showPage(pageId) {
    document.querySelectorAll(".page").forEach(p => p.style.display = "none");
    document.getElementById(pageId).style.display = "block";
}

function startGame() {
    showPage("gamePage");
    resetLevel();
}

function showWin() {
    showPage("winPage");
}

function showLose() {
    showPage("losePage");
}

function restartGame() {
    showPage("titlePage");
    currentSpecies = 0;
}

function handleChoice(choiceIndex, event) {
    const choice = event.choices[choiceIndex];
    let insightText = "";

    // Adjust stats
    if (choice.good) {
        population += 10;
        diversity += 0.05;
        inbreeding -= 0.05;
        insightText = "Good conservation decision! Maintaining population and diversity helps reduce inbreeding.";
    } else {
        population -= 15;
        diversity -= 0.05;
        inbreeding += 0.05;
        insightText = "Risky decision! Ignoring genetics can lead to lower diversity and higher inbreeding, risking extinction.";
    }

    // Clamp stats
    population = Math.max(0, population);
    diversity = Math.min(1, Math.max(0, diversity));
    inbreeding = Math.min(1, Math.max(0, inbreeding));

    // Update the insight box
    document.getElementById("result").innerText = insightText;

    year++;
    checkGameState();
}