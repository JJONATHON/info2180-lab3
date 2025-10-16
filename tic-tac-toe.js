// Wait until the HTML is fully parsed before running any code
document.addEventListener("DOMContentLoaded", () => {

  // Grab references to the existing elements in the page
  const statusEl   = document.getElementById("status");          // the message bar at the top
  const boardEl    = document.getElementById("board");           // the 3×3 board container
  const newGameBtn = document.querySelector(".controls .btn");   // the “New Game” button

  // If any of those elements are missing, stop and log an error (prevents crashes)
  if (!boardEl || !statusEl || !newGameBtn) {
    console.error("Required elements not found (status, board, or button).");
    return;
  }

  // Get all direct child <div>s inside the board — these are the 9 squares
  let squares = boardEl.querySelectorAll("div");

  // If the board doesn’t have squares yet, create exactly 9 of them
  if (squares.length === 0) {
    for (let i = 0; i < 9; i++) boardEl.appendChild(document.createElement("div"));
    squares = boardEl.querySelectorAll("div"); // re-query now that we added them
  }

  // EXERCISE 1: add the CSS class that makes each cell look like a tile
  squares.forEach(sq => sq.classList.add("square"));

  // ---- Game state (used by the remaining exercises) ----
  let currentPlayer = "X";               // whose turn it is right now ("X" or "O")
  let board = Array(9).fill(null);       // logical board: 9 slots, null means empty
  let gameActive = true;                 // becomes false after a win or a draw

  // All 8 ways to win: each triple is indices into the 0..8 board
  const WINS = [
    [0,1,2], [3,4,5], [6,7,8],          // rows
    [0,3,6], [1,4,7], [2,5,8],          // columns
    [0,4,8], [2,4,6]                    // diagonals
  ];

  // Return "X" or "O" if that player has any winning triple, else null
  const checkWinner = () => {
    for (const [a,b,c] of WINS) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
    }
    return null;
  };

  // True if there are no nulls left (i.e., all squares filled)
  const isDraw = () => board.every(v => v !== null);

  // EXERCISES 2, 3, 4, 6: click/hover behavior, marking tiles, win/draw check, block overwrites
  squares.forEach((square, i) => {
    // Hover in: add a CSS class that changes appearance (defined in CSS)
    square.addEventListener("mouseover", () => square.classList.add("hover"));
    // Hover out: remove that CSS class
    square.addEventListener("mouseout",  () => square.classList.remove("hover"));

    // Handle a move when the square is clicked
    square.addEventListener("click", () => {
      // If the game is over OR this square is already filled, ignore the click
      if (!gameActive || board[i] !== null) return;

      // Record the move in the logical board
      board[i] = currentPlayer;
      // Show the mark in the UI (big “X” or “O” in the square)
      square.textContent = currentPlayer;
      // Add a class named "X" or "O" (for color) and "filled" (to change cursor)
      square.classList.add(currentPlayer, "filled");
      // Remove hover style once the square is used
      square.classList.remove("hover");

      // Check if the move won the game
      const winner = checkWinner();
      if (winner) {
        gameActive = false;                                    // stop future moves
        statusEl.textContent = `Congratulations! ${winner} is the Winner!`; // message
        statusEl.classList.add("you-won");                     // green styling in CSS
        return;                                                // end handler
      }

      // If no winner and the board is full, it’s a draw
      if (isDraw()) {
        gameActive = false;                                    // stop future moves
        statusEl.textContent = "It's a draw!";                 // message
        return;
      }

      // Otherwise, swap turns and update the status text
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusEl.textContent = `Next move: ${currentPlayer}`;
    });
  });

  // EXERCISE 5: Reset everything when “New Game” is clicked
  newGameBtn.addEventListener("click", () => {
    board.fill(null);                        // clear logical board
    gameActive = true;                       // allow moves again
    currentPlayer = "X";                     // X starts

    // Clear each square’s text and any styling classes from previous game
    squares.forEach(sq => {
      sq.textContent = "";
      sq.classList.remove("X", "O", "hover", "filled");
    });

    // Restore the default status message/appearance
    statusEl.classList.remove("you-won");
    statusEl.textContent = "Move your mouse over a square and click to play an X or an O.";

    // (Optional) move focus back to the board for accessibility
    boardEl?.focus?.();
  });
});
