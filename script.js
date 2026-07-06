
const startBtn = document.querySelector("#start-game");
const scoreBtn = document.querySelector("#max-score");

const player1Input = document.querySelector("#player1");
const player2Input = document.querySelector("#player2");

const player1Name = document.querySelector("#player1-name");
const player2Name = document.querySelector("#player2-name");

const player1Score = document.querySelector("#player1-score");
const player2Score = document.querySelector("#player2-score");

const currentPlayer = document.querySelector("#current-turn");
const roundResult = document.querySelector("#result-text");

const contSetup = document.querySelector(".container-setup");
const contMain = document.querySelector(".container-main");

const resetBtn = document.querySelector(".result button")

const choiceBtns = document.querySelectorAll(".button-group button");

let p1 = "PLAYER 1";
let p2 = "PLAYER 2";

let score1 = 0;
let score2 = 0;

let turn = 1;
let player1Choice = "";
let player2Choice = "";

let round = 1;
let maxScore;

startBtn.addEventListener("click", () => {

    resetBtn.style.display = "none";
    contSetup.style.display = "none";
    contMain.style.display = "block";

    if (scoreBtn.value === "" || scoreBtn.value > 10) {
        maxScore = 5;
    } else {
        maxScore = Number(scoreBtn.value);
    }

    p1 = player1Input.value.toUpperCase() || "PLAYER 1";
    p2 = player2Input.value.toUpperCase() || "PLAYER 2";

    player1Name.textContent = p1;
    player2Name.textContent = p2;

    score1 = 0;
    score2 = 0;

    player1Score.textContent = score1;
    player2Score.textContent = score2;

    round = 1;
    turn = 1;

    player1Choice = "";
    player2Choice = "";

    currentPlayer.textContent = p1.toUpperCase();
    roundResult.textContent = `ROUND ${round} : ${p1}'s TURN`;

    choiceBtns.forEach(button => {
        button.disabled = false;
    });

});

choiceBtns.forEach(button => {

    button.addEventListener("click", () => {

        if (turn === 1) {

            player1Choice = button.id;
            turn = 2;

            currentPlayer.textContent = p2;
            roundResult.textContent = `ROUND ${round} : ${p2}'s TURN`;
        } else {

            player2Choice = button.id;

            determineWinner();

            if (score1 >= maxScore || score2 >= maxScore) {

                if (score1 > score2) {
                    roundResult.textContent = `${p1} WINS :P`;
                } else if (score2 > score1) {
                    roundResult.textContent = `${p2} WINS :P`;
                } else {
                    roundResult.textContent = `TIE!`
                }

                currentPlayer.textContent = "GAME FINISHED!";

                resetBtn.style.display = "inline";

                choiceBtns.forEach(button => {

                    button.disabled = true;
                });

                return;
            }

            round++;
            turn = 1;

            player1Choice = "";
            player2Choice = "";

            currentPlayer.textContent = p1;
            roundResult.textContent = `ROUND ${round} : ${p1}'s TURN`;


        }

    });

});

resetBtn.addEventListener("click", () => {
    contSetup.style.display = "block";
    contMain.style.display = "none";

    player1Input.value = "";
    player2Input.value = "";

    scoreBtn.value = "";
});

function determineWinner() {

    if (player1Choice === player2Choice) {
        roundResult.textContent =
            `ROUND ${round} : TIE!\n${p1} : ${player1Choice}\n${p2} : ${player2Choice}`;
        return;
    }

    if (
        (player1Choice === "rock" && player2Choice === "scissors") ||
        (player1Choice === "paper" && player2Choice === "rock") ||
        (player1Choice === "scissors" && player2Choice === "paper")) {

        score1++;
        player1Score.textContent = score1;

        roundResult.textContent =
            `ROUND ${round} : ${p1} WINS!\n${p1} - ${player1Choice}\n${p2} - ${player2Choice}`;
    }
    else {

        score2++;
        player2Score.textContent = score2;

        roundResult.textContent =
            `ROUND ${round} : ${p2} WINS!\n${p2} - ${player2Choice}\n${p1} - ${player1Choice}`;
    }
}