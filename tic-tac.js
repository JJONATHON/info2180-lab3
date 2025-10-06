document.addEventListener("DOMContentLoaded", () => {
  const squares = document.querySelectorAll("#board div");

  // Exercise 1 requirement: style each cell
  squares.forEach(square => {
    square.classList.add("square");   // <-- this makes them visible as tiles
  });

  // (optional) your click handler can stay
  squares.forEach(square => {
    square.addEventListener("click", () => {
      square.classList.add("selected"); // only matters if you later style .selected
    });
  });
});



