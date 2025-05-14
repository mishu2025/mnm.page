const EMPTY = 0, X = 1, O = -1;
let board = Array(9).fill(EMPTY);
let gameOver = false;

// Create board buttons
const boardContainer = document.getElementById("game-board");
const messageElem = document.getElementById("game-message");
const resetBtn = document.getElementById("reset-btn");

function renderBoard() {
  boardContainer.innerHTML = '';
  board.forEach((val, idx) => {
    const btn = document.createElement("button");
    btn.textContent = val === X ? "X" : val === O ? "O" : "";
    btn.disabled = val !== EMPTY || gameOver;
    btn.addEventListener("click", () => userMove(idx));
    boardContainer.appendChild(btn);
  });
}

function userMove(index) {
  if (board[index] !== EMPTY || gameOver) return;
  board[index] = O;
  renderBoard();

  let result = checkWinner();
  if (result) return endGame(result);

  setTimeout(agentMove, 300);
}

function agentMove() {
  const validMoves = board
    .map((val, idx) => val === EMPTY ? idx : null)
    .filter(idx => idx !== null);

  if (validMoves.length === 0) return;

  const move = validMoves[Math.floor(Math.random() * validMoves.length)];
  board[move] = X;
  renderBoard();

  let result = checkWinner();
  if (result) return endGame(result);
}

function checkWinner() {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (let [a, b, c] of lines) {
    if (board[a] !== EMPTY && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return board.includes(EMPTY) ? null : 'draw';
}

function endGame(result) {
  gameOver = true;
  if (result === X) {
    messageElem.textContent = "Agent (X) wins!";
  } else if (result === O) {
    messageElem.textContent = "You (O) win!";
  } else {
    messageElem.textContent = "It's a draw!";
  }
}

function resetGame() {
  board = Array(9).fill(EMPTY);
  gameOver = false;
  messageElem.textContent = "Your turn (O)";
  renderBoard();
}

resetBtn.addEventListener("click", resetGame);

// Initial render
renderBoard();
