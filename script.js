const EMPTY = 0, X = 1, O = -1;
let board = Array(9).fill(EMPTY);
let gameOver = false;

function renderBoard() {
  const container = document.getElementById("game-board");
  container.innerHTML = "";
  board.forEach((val, idx) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = val === X ? "X" : val === O ? "O" : "";
    cell.onclick = () => handleClick(idx);
    container.appendChild(cell);
  });
}

function handleClick(index) {
  if (board[index] !== EMPTY || gameOver) return;
  board[index] = O;
  renderBoard();
  const winner = checkWinner(board);
  if (winner !== null) return endGame(winner);
  setTimeout(agentTurn, 200);
}

function agentTurn() {
  const stateKey = boardToKey(board);
  const move = getAction(stateKey, board);
  if (move === null) return endGame("draw");
  board[move] = X;
  renderBoard();
  const winner = checkWinner(board);
  if (winner !== null) endGame(winner);
}

function endGame(result) {
  gameOver = true;
  const status = document.getElementById("game-status");
  status.textContent = result === "draw" ? "It's a draw!" : result === X ? "Agent (X) wins!" : "You (O) win!";
}

function resetGame() {
  board = Array(9).fill(EMPTY);
  gameOver = false;
  document.getElementById("game-status").textContent = "";
  renderBoard();
}

function checkWinner(b) {
  const lines = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  for (let [a,b,c] of lines) {
    if (board[a] !== EMPTY && board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }
  return board.includes(EMPTY) ? null : "draw";
}

window.onload = renderBoard;
