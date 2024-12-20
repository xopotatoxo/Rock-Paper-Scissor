const container = document.querySelector("#container");
const resultContainer = document.querySelector("#result-container");
const startButton = document.querySelector("#start");
const buttons = document.querySelectorAll("#button-container button");
const currScore = document.createElement("div");

let humanChoice = null;
let roundsPlayed = 0;
let humanScore = 0;
let computerScore = 0;
const totalRounds = 5;
const choices = ["Rock", "Paper", "Scissors"];

disableButtons();

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        humanChoice = Number(button.id);
        if (roundsPlayed < totalRounds) {
            resultContainer.innerHTML = '';
            playGame();
        }
    });
});

startButton.textContent = "NEW GAME";
startButton.addEventListener("click", () => {
    roundsPlayed = 0;
    humanScore = 0;
    computerScore = 0;
    resultContainer.innerHTML = ''; // Clear previous results
    enableButtons();
});

function enableButtons() {
    buttons.forEach((button) => {
        button.disabled = false;
    });
}

function disableButtons() {
    buttons.forEach((button) => {
        button.disabled = true;
    });
}

function getComputerChoice() {
    return Math.floor(Math.random() * 3);
}

function getHumanChoice() {
    return humanChoice;
}

function playRound(computerChoice, humanChoice) {

    roundsPlayed++;
    
    if (computerChoice === humanChoice) {
        const result = document.createElement("div");
        result.textContent = `It's a tie! Both chose ${choices[computerChoice]}`;
        resultContainer.appendChild(result);
        return -1;
    }

    const choiceSelectedA = document.createElement("div");
    choiceSelectedA.textContent = `Computer: ${choices[computerChoice]}`;
    resultContainer.appendChild(choiceSelectedA);

    const choiceSelectedB = document.createElement("div");
    choiceSelectedB.textContent =  `You: ${choices[humanChoice]}`;
    resultContainer.appendChild(choiceSelectedB);

    return winner(computerChoice, humanChoice);
}

function winner(computer, human){
    switch(`${computer}-${human}`){
        case "0-1": return 1;
        case "0-2": return 0;
        case "1-0": return 0;
        case "1-2": return 1;
        case "2-0": return 1;
        case "2-1": return 0;
    }
}

function playGame() {
    
    if (roundsPlayed >= totalRounds) {
        displayFinalResult();
        disableButtons();
        return;
    }

    const computerChoice = getComputerChoice();
    const humanChoice = getHumanChoice();
    const roundResult = playRound(computerChoice, humanChoice);

    if (roundResult === 1) {
        humanScore++;
    } else if (roundResult === 0) {
        computerScore++;
    }

    currScore.classList.add("content");
    currScore.textContent =  `Current Score: You ${humanScore} - Computer ${computerScore}`;
    resultContainer.appendChild(currScore);

    if (roundsPlayed < totalRounds) {
        humanChoice = null; 
    } else {
        displayFinalResult();
    }
}

function displayFinalResult() {
    
    if (humanScore > computerScore) {
        currScore.textContent = `You are the winner! Final Score: You ${humanScore} - Computer ${computerScore}`;
    } else if (computerScore > humanScore) {
        currScore.textContent = `Winner is the Computer! Final Score: Computer ${computerScore} - You ${humanScore}`;
    } else {
        currScore.textContent = `It's a tie game! Final Score: You ${humanScore} - Computer ${computerScore}`;
    }

    resultContainer.appendChild(finalResult);
}
