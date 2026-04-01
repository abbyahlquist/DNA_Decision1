/////////////////////////
// DNA Decisions Game //
/////////////////////////

// Game state
let speciesList = ["Whale Shark", "Leatherback Turtle", "North Atlantic Right Whale"];
let currentSpecies = 0;
let year = 1;
let population = 100;
let diversity = 1;
let inbreeding = 0.0;
let currentEventIndex = 0;
let currentEvent = null;

// Events by level (easy → medium → hard)
const levelEvents = [
   // Level 1: Whale Shark
    [
        {
            text: "Genetic tests show low diversity in a population. What do you do?",
            choices: [
                { text: "Introduce individuals from other populations.", good: true },
                { text: "Keep breeding only within the current group.", good: false },
                { text: "Ignore diversity.", good: false }
            ]
        },
        {
            text: "A disease outbreak spreads. What do you do?",
            choices: [
                { text: "Vaccinate affected sharks.", good: true },
                { text: "Do nothing.", good: false },
                { text: "Remove random individuals.", good: false }
            ]
        },
         {
        text: "Two whale sharks have very similar genes. How do you prevent problems?",
        choices: [
            { text: "Avoid breeding them.", good: true },
            { text: "Breed them together.", good: false },
            { text: "leave them alone.", good: false }
        ]
        },
        {
            text: "DNA shows some inbreeding. How to respond?",
            choices: [
                { text: "Move a few unrelated sharks to the population.", good: true },
                { text: "Breed only with related individuals.", good: false },
                { text: "Prevent all breeding.", good: false }
            ]
        },
            {
        text: "A shark shows a rare gene mutation. What is a DNA-based way to help?",
        choices: [
            { text: "Include it in breeding programs.", good: true },
            { text: "Avoid it because it is unusual.", good: false },
            { text: "Sell it to another aquarium.", good: false }
        ]
        },
            {
        text: "You notice a small isolated group in a lagoon. How can DNA guide you?",
        choices: [
            { text: "Introduce unrelated sharks to increase diversity.", good: true },
            { text: "Keep them separate to monitor.", good: false },
            { text: "Stop all breeding.", good: false }
        ]
        },
            {
        text: "You want to make a family tree of the sharks. Why DNA is important?",
        choices: [
            { text: "To track relatedness and avoid inbreeding.", good: true },
            { text: "To choose the biggest sharks.", good: false },
            { text: "To see which shark eats most.", good: false }
        ]
        },


    ],


    // Level 2: Leatherback Turtle
    [
   {
        text: "A turtle nest shows unusual hatchling survival. What DNA-based check is useful?",
        choices: [
            { text: "Test genetic diversity of the nest.", good: true },
            { text: "Count how many hatched.", good: false },
            { text: "Change the sand temperature.", good: false }
        ]
    },
    {
        text: "You discover two turtles from distant beaches. How can DNA guide breeding?",
        choices: [
            { text: "Compare DNA to reduce relatedness.", good: true },
            { text: "Breed them anyway.", good: false },
            { text: "Keep them apart.", good: false }
        ]
    },
    {
        text: "Some hatchlings carry a rare allele. How should you act?",
        choices: [
            { text: "Include them in breeding programs.", good: true },
            { text: "Ignore and let nature decide.", good: false },
            { text: "Send them to other beaches.", good: false }
        ]
    },
    {
        text: "A beach has many turtles but low survival. What DNA action helps?",
        choices: [
            { text: "Introduce unrelated turtles.", good: true },
            { text: "Feed them more food.", good: false },
            { text: "Block predators temporarily.", good: false }
        ]
    },
    {
        text: "A turtle shows signs of genetic disease. Best DNA-based action?",
        choices: [
            { text: "Avoid breeding it until tested.", good: true },
            { text: "Breed it immediately.", good: false },
            { text: "Move it to another beach.", good: false }
        ]
    },
    {
        text: "Some eggs are infertile. How can DNA info help?",
        choices: [
            { text: "Check parents genetic compatibility.", good: true },
            { text: "Increase incubation temperature.", good: false },
            { text: "Add more sand to nests.", good: false }
        ]
    },
    {
        text: "You want to track population genetics over years. What do you do?",
        choices: [
            { text: "Collect DNA samples annually.", good: true },
            { text: "Count turtles every year.", good: false },
            { text: "Measure shell sizes.", good: false }
        ]
    },
    {
        text: "A beach receives migrants from other regions. what does this do?",
        choices: [
            { text: "Increases genetic diversity.", good: true },
            { text: "Causes overcrowding.", good: false },
            { text: "No effect on turtles.", good: false }
        ]
    },
    {
        text: "A hatchling shows unusual DNA markers. What do you do?",
        choices: [
            { text: "Include it in breeding programs.", good: true },
            { text: "Release it.", good: false },
            { text: "Keep it isolated.", good: false }
        ]
    }
    ],


    // Level 3: North Atlantic Right Whale
    [
        {
        text: "You detect low genetic diversity in a small pod. What do you do?",
        choices: [
            { text: "Bring in unrelated whales from distant pods.", good: true },
            { text: "Breed only within this pod.", good: false },
            { text: "Avoid interfering with natural migration.", good: false }
        ]
    },
    {
        text: "A pregnant whale carries rare alleles but lives in a high-ship-traffic area.",
        choices: [
            { text: "Escort her to a safer area for calving.", good: true },
            { text: "Let her continue naturally.", good: false },
            { text: "Move the pod to a new area immediately.", good: false }
        ]
    },
    {
        text: "entanglement risk is rising. Decision?",
        choices: [
            { text: "Install protected zones and monitor DNA-related lineage survival.", good: true },
            { text: "Monitor only, no intervention.", good: false },
            { text: "Relocate whales individually.", good: false }
        ]
    },
    {
        text: "A whale calf shows potential genetic disorder. Your move?",
        choices: [
            { text: "Restrict its breeding until DNA is verified.", good: true },
            { text: "Allow it to breed.", good: false },
            { text: "Release it without monitoring.", good: false }
        ]
    },
    {
        text: "Some whales are showing signs of inbreeding. What action?",
        choices: [
            { text: "Introduce unrelated whales to breeding pods.", good: true },
            { text: "Continue natural mating.", good: false },
            { text: "Prevent breeding temporarily.", good: false }
        ]
    },
    {
        text: "Calves are dying due to limited genetic variation. Strategy?",
        choices: [
            { text: "Identify diverse parents and encourage mating.", good: true },
            { text: "Increase food supply.", good: false },
            { text: "Move pods to new areas without monitoring.", good: false }
        ]
    },
    {
        text: "Whale songs indicate social stress affecting mating. Decision?",
        choices: [
            { text: "Relocate stressed whales to low-traffic waters.", good: true },
            { text: "Ignore; let them adapt naturally.", good: false },
            { text: "Separate whales randomly to new pods.", good: false }
        ]
    },
    {
        text: "A rare allele appears in a calf but the mother is old. Action?",
        choices: [
            { text: "Use assisted reproduction to preserve allele.", good: true },
            { text: "Wait for natural breeding.", good: false },
            { text: "Do nothing; allele may be lost.", good: false }
        ]
    },
    {
        text: "High contamination detected in feeding areas. What now?",
        choices: [
            { text: "Move pods temporarily while preserving breeding groups.", good: true },
            { text: "Leave pods; contamination is temporary.", good: false },
            { text: "Feed them artificially in tanks.", good: false }
        ]
    },
    {
        text: "Ship collisions threaten calves. Genetic diversity is low. Your response?",
        choices: [
            { text: "Enforce speed limits in key breeding zones.", good: true },
            { text: "Monitor collisions but do not interfere.", good: false },
            { text: "Relocate calves individually.", good: false }
        ]
    },
    {
        text: "Climate change is shifting plankton distribution, affecting food. Strategy?",
        choices: [
            { text: "Track high genetic value pods and guide them to areas with more food.", good: true },
            { text: "Let whales find food naturally.", good: false },
            { text: "Supplement their food artificially.", good: false }
        ]
    },
    {
        text: "Two small pods could benefit from interbreeding but are far apart.",
        choices: [
            { text: "Encourage migration and mixing.", good: true },
            { text: "Keep pods separate.", good: false },
            { text: "Relocate one pod.", good: false }
        ]
    },
    {
        text: "Noise pollution is disrupting mating calls. Your action?",
        choices: [
            { text: "Implement quiet zones for breeding pods.", good: true },
            { text: "Ignore; natural selection will sort it.", good: false },
            { text: "Relocate pods to distant areas.", good: false }
        ]
    },
    {
        text: "Calf survival rate drops sharply in one pod. Strategy?",
        choices: [
            { text: "Use DNA analysis to select compatible parents.", good: true },
            { text: "Increase pod size artificially.", good: false },
            { text: "Protect habitat only.", good: false }
        ]
    },
    {
        text: "Genetic monitoring shows some whales carry very rare alleles.",
        choices: [
            { text: "Prioritize them for breeding programs.", good: true },
            { text: "Breed only average whales.", good: false },
            { text: "Do nothing; alleles may disappear.", good: false }
        ]
    }
    ]

];

// Shuffle helper (Fisher-Yates)
function shuffleChoices(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Update display
function updateDisplay() {
    const event = currentEvent;
    document.getElementById("species").innerText = speciesList[currentSpecies];
    document.getElementById("year").innerText = year;
    document.getElementById("population").innerText = Math.round(population);
    document.getElementById("diversity").innerText = diversity.toFixed(2);
    document.getElementById("inbreeding").innerText = inbreeding.toFixed(2);

    document.getElementById("popBar").style.width = population + "%";
    document.getElementById("divBar").style.width = diversity * 100 + "%";
    document.getElementById("inbreedBar").style.width = inbreeding * 100 + "%";

    // Set event text
    document.getElementById("event").innerText = event.text;

    // Shuffle buttons for this event
    const shuffled = shuffleChoices([...event.choices]);
    currentEvent.shuffledChoices = shuffled;

    document.querySelectorAll(".btn-light").forEach((btn, i) => {
        btn.innerText = shuffled[i].text;
    });
}

// Handle choice
function handleChoice(index) {
    const choice = currentEvent.shuffledChoices[index];

    if (choice.good) {
        population += 10;
        diversity += 0.05;
        inbreeding -= 0.05;
    } else {
        population -= 15;
        diversity -= 0.05;
        inbreeding += 0.1;
    }

    // Clamp values
    population = Math.max(0, population);
    diversity = Math.min(1, Math.max(0, diversity));
    inbreeding = Math.min(1, Math.max(0, inbreeding));

    // Check fail
    if (population <= 10 || diversity <= 0.3 || inbreeding >= 0.4) {
        showLose();
        return;
    }

    year++;
    nextScenario();
}

// Buttons
function choiceA() { handleChoice(0); }
function choiceB() { handleChoice(1); }
function choiceC() { handleChoice(2); }

// Next scenario
function nextScenario() {
    const eventsForLevel = levelEvents[currentSpecies];

    if (currentEventIndex < eventsForLevel.length - 1) {
        currentEventIndex++;
        currentEvent = eventsForLevel[currentEventIndex];
        updateDisplay();
    } else {
        // Level completed
        currentSpecies++;
        if (currentSpecies >= levelEvents.length) {
            showWin();
        } else {
            alert("Level completed! Next species unlocked.");
            resetLevel();
        }
    }
}

// Reset level
function resetLevel() {
    year = 1;
    population = 100;
    diversity = 1.0;
    inbreeding = 0.0;
    currentEventIndex = 0;
    currentEvent = levelEvents[currentSpecies][0];
    updateBackground();
    updateDisplay();
}

// Page control
function showPage(id) {
    document.querySelectorAll(".page").forEach(p => p.style.display = "none");
    document.getElementById(id).style.display = "block";
}

// Backgrounds per species
const speciesBackgrounds = [
    "url('images/whale_shark_bg.jpg')",
    "url('images/leatherback_turtle_bg.jpg')",
    "url('images/right_whale_bg.jpg')"
];

// Update background
function updateBackground() {
    const bg = speciesBackgrounds[currentSpecies];
    document.getElementById("gamePage").style.backgroundImage = bg;
}

// Game control
function startGame() {
    showPage("gamePage");
    resetLevel();
}

function restartGame() {
    currentSpecies = 0;
    showPage("titlePage");
}

function showWin() { showPage("winPage"); }
function showLose() { showPage("losePage"); }

// Initialize game state properly
currentSpecies = 0;
currentEventIndex = 0;
currentEvent = null;
showPage("titlePage");
