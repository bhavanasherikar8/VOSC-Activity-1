const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;

let board = ["", "", "", "", "", "", "", ""];

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {

    const clickedCell = event.target;

    const clickedIndex = Array.from(cells).indexOf(clickedCell);

    if (board[clickedIndex] !== "" || !gameActive) {
        return;
    }

    board[clickedIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    checkResult();
}

function checkResult() {

    let winner = null;

    for (let pattern of winningPatterns) {

        const a = pattern[0];
        const b = pattern[1];
        const c = pattern[2];

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            winner = board[a];
            break;
        }
    }

    if (winner !== null) {

        statusText.textContent = `Player ${winner} Wins!`;

        gameActive = false;

        return;
    }

    if (!board.includes("")) {

        statusText.textContent = "It's a Draw!";

        gameActive = false;

        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function restartGame() {

    currentPlayer = "X";
    gameActive = true;

    board = ["", "", "", "", "", "", "", ""];

    statusText.textContent = "Player X's Turn";

    cells.forEach(function(cell) {
        cell.textContent = "";
    });
}

cells.forEach(function(cell) {
    cell.addEventListener("click", handleCellClick);
});

restartButton.addEventListener("click", restartGame);