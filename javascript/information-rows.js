document.addEventListener("DOMContentLoaded", function () {
  const cycleButton = document.getElementById("cycleButton");
  const cardRows = document.querySelectorAll(".card-row");
  const gridContainer = document.querySelector(".grid-container"); // Add this line

  // Show the first row by default
  
  cardRows[0].style.display = "flex";
  cardRows[0].classList.add("slide-left"); // Add this line

  let currentRow = 1;

  cycleButton.addEventListener("click", function () {
    cardRows.forEach((row, index) => {
      if (index === currentRow) {
        row.style.display = "flex"; // Show the current row
        row.classList.add("slide-left");
      } else {
        row.style.display = "none"; // Hide other rows
        row.classList.add("slide-left");
      }
    });

    // Move to the next row, cycling back to the first row if needed
    currentRow = (currentRow + 1) % cardRows.length;
   
  });
});