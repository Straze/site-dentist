document.addEventListener("DOMContentLoaded", function() {
  const carousel = document.querySelector("#carousel");
  const prevButton = document.querySelector(".carousel-prev-photo");
  const nextButton = document.querySelector(".carousel-next-photo");
  const radioButtons = document.querySelectorAll(".radio-buttons input");

  let currentPosition = 3;
  const numItems = 5; // Number of items in the carousel

  prevButton.addEventListener("click", function() {
    currentPosition = (currentPosition - 2 + numItems) % numItems + 1;
    updateCarousel();
  });

  nextButton.addEventListener("click", function() {
    currentPosition = currentPosition % numItems + 1;
    updateCarousel();
  });

  radioButtons.forEach(function(radioButton, index) {
    radioButton.addEventListener("click", function() {
      currentPosition = index + 1;
      updateCarousel();
    });
  });

  function updateCarousel() {
    carousel.style.setProperty("--position", currentPosition);
  }
});