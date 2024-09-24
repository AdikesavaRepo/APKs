const gameBoard = document.getElementById('gameBoard');
const statusMessage = document.getElementById('statusMessage');
const resetButton = document.getElementById('resetButton');
const winnerScreen = document.getElementById('winnerScreen');
const winnerMessage = document.getElementById('winnerMessage');
const newMatchButton = document.getElementById('newMatchButton');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;
let winningCells = [];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellClick(index) {
    if (board[index] || !isGameActive) return;

    board[index] = currentPlayer;
    renderBoard();
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatusMessage();
}

function renderBoard() {
    gameBoard.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.innerText = cell;

        if (winningCells.includes(index)) {
            cellElement.classList.add('winner');
        }

        cellElement.addEventListener('click', () => handleCellClick(index));
        gameBoard.appendChild(cellElement);
    });
}

function checkWinner() {
    winningCells = [];

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            isGameActive = false;
            winningCells = [a, b, c];
            showWinnerScreen(`Player ${board[a]} wins! 🎉`);
            return;
        }
    }

    if (!board.includes('')) {
        isGameActive = false;
        showWinnerScreen("It's a draw! 😞");
    }
}

function showWinnerScreen(message) {
    winnerMessage.innerText = message;
    winnerScreen.style.display = 'flex';
    gameBoard.style.display = 'none';
    resetButton.style.display = 'none';
}

newMatchButton.addEventListener('click', resetGame);

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameActive = true;
    statusMessage.innerText = '';
    winnerScreen.style.display = 'none';
    gameBoard.style.display = 'grid';
    resetButton.style.display = 'inline';
    renderBoard();
    updateStatusMessage();
}

function updateStatusMessage() {
    if (isGameActive) {
        statusMessage.innerText = `Player ${currentPlayer} is playing`;
    }
}

// Initialize the game status message
updateStatusMessage();
renderBoard();
