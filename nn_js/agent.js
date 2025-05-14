let Q_table = {};
const epsilon = 0.0; // No exploration in browser

// Load Q-table from JSON file
fetch("q_table.json")
  .then((res) => res.json())
  .then((data) => {
    Q_table = data;
    console.log("Q-table loaded. States:", Object.keys(Q_table).length);
  })
  .catch((err) => console.error("Failed to load Q-table:", err));

// Convert array to string key
function boardToKey(board) {
  return board.join(",");
}

// Choose best action using epsilon-greedy policy
function getAction(stateKey, board) {
  if (!(stateKey in Q_table)) return randomValidAction(board);

  const qValues = Q_table[stateKey];
  const validActions = board
    .map((cell, idx) => (cell === 0 ? idx : null))
    .filter((v) => v !== null);

  // Pure greedy (epsilon = 0)
  let bestAction = validActions[0];
  let bestQ = -Infinity;
  for (const a of validActions) {
    const q = qValues[a] ?? 0;
    if (q > bestQ) {
      bestQ = q;
      bestAction = a;
    }
  }

  return bestAction;
}

// Fallback if state is unknown
function randomValidAction(board) {
  const valid = board
    .map((cell, idx) => (cell === 0 ? idx : null))
    .filter((v) => v !== null);
  return valid.length ? valid[Math.floor(Math.random() * valid.length)] : null;
}
