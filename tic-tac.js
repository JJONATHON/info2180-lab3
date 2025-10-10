document.addEventListener("DOMContentLoaded", () => {
  const squares = document.querySelectorAll("#board div");
  const statusE1 = document.getElementById("status");

  // Exercise 1 requirement: style each cell
  squares.forEach(square => {
    square.classList.add("square");   // <-- this makes them visible as tiles
  });

   // Exercise 2 requirement: set initial status message
  let currentPlayer = "X"; // X always starts
  const board = Array(9).fill(null); // to track the state of the board

  squares.forEach((square, index) => {
    square.addEventListener("click", () => {
      if (board[index] !== null) return; // already taken
      board[index] = currentPlayer;
      square.textContent = currentPlayer;{
        /* Update the status message */
      }
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusE1.textContent = `Player ${currentPlayer}'s turn`;
    });
  })});
  
