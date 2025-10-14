document.addEventListener("DOMContentLoaded", () => {
  const boardEl   = document.getElementById("board");
  const squares   = document.querySelectorAll("#board div");
  const statusEl  = document.getElementById("status");
  const newGameBtn = document.getElementById("new-game");

  // Exercise 1: style each cell
  squares.forEach(sq => sq.classList.add("square"));

  // Game state
  let currentPlayer = "X";
  let board = Array(9).fill(null);
  let gameActive = true;

  // All winning lines (indices in the 0..8 board)
  const WINS = [
    [0,1,2], [3,4,5], [6,7,8],  // rows
    [0,3,6], [1,4,7], [2,5,8],  // cols
    [0,4,8], [2,4,6]            // diagonals
  ];

  function checkWinner() {
    for (const [a,b,c] of WINS) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // "X" or "O"
      }
    }
    return null;
  }

  function checkDraw() {
    return board.every(cell => cell !== null);
  }

  // Exercise 2 & 3: place marks + hover
  squares.forEach((square, i) => {
    square.addEventListener("mouseover", () => square.classList.add("hover"));
    square.addEventListener("mouseout",  () => square.classList.remove("hover"));

    square.addEventListener("click", () => {
      if (!gameActive) return;        // stop if game over
      if (board[i] !== null) return;  // don't overwrite

      // Place mark
      board[i] = currentPlayer;
      square.textContent = currentPlayer;
      square.classList.add(currentPlayer); // .X or .O color

      // Exercise 4: winner / draw detection
      const winner = checkWinner();
      if (winner) {
        gameActive = false;
        statusEl.textContent = `Congratulations! ${winner} is the Winner!`;
        statusEl.classList.add("you-won");
        return;
      }

      if (checkDraw()) {
        gameActive = false;
        statusEl.textContent = "It's a draw!";
        // (No you-won class for draw)
        return;
      }

      // Next turn
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusEl.textContent = `Next move: ${currentPlayer}`;
    });
  });

  // Reset / New Game
  newGameBtn.addEventListener("click", () => {
    board.fill(null);
    gameActive = true;
    currentPlayer = "X";
    squares.forEach(sq => {
      sq.textContent = "";
      sq.classList.remove("X", "O", "hover");
    });
    statusEl.classList.remove("you-won");
    statusEl.textContent = "Move your mouse over a square and click to play an X or an O.";
    boardEl.focus?.();
  });
});
