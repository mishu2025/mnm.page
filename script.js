const EMPTY = 0, X = 1, O = -1;
let board = Array(9).fill(EMPTY);
let gameOver = false;

const statusEl = document.getElementById("status");
const boardEl = document.getElementById("game-board");
const resetBtn = document.getElementById("reset");

function renderBoard() {
  boardEl.innerHTML = "";
  board.forEach((cell, idx) => {
    const cellBtn = document.createElement("button");
    cellBtn.className = "cell";
    cellBtn.textContent = cell === X ? "X" : cell === O ? "O" : "";
    cellBtn.disabled = cell !== EMPTY || gameOver;
    cellBtn.onclick = () => handlePlayerMove(idx);
    boardEl.appendChild(cellBtn);
  });
}

function handlePlayerMove(idx) {
  if (board[idx] !== EMPTY || gameOver) return;
  board[idx] = O;
  renderBoard();
  let winner = checkWinner(board);
  if (winner) return endGame(winner);
  setTimeout(agentMove, 300);
}

function agentMove() {
  const stateKey = board.join(",");
  const action = getAction(stateKey, board);
  if (action == null) return;
  board[action] = X;
  renderBoard();
  let winner = checkWinner(board);
  if (winner) return endGame(winner);
}

function endGame(winner) {
  gameOver = true;
  if (winner === X) statusEl.textContent = "Agent (X) wins!";
  else if (winner === O) statusEl.textContent = "You (O) win!";
  else statusEl.textContent = "It's a draw!";
}

function checkWinner(b) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6]          // diagonals
  ];
  for (const [a,b,c] of lines) {
    if (board[a] !== EMPTY && board[a] === board[b] && board[b] === board[c])
      return board[a];
  }
  return board.includes(EMPTY) ? null : "draw";
}

resetBtn.onclick = () => {
  board = Array(9).fill(EMPTY);
  gameOver = false;
  statusEl.textContent = "Your turn (O)";
  renderBoard();
};

renderBoard();
