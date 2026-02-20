document.addEventListener("DOMContentLoaded", function () {
  const moreInfoButtons = document.querySelectorAll(".buttons-container a[data-target]");
  const moreInfoSections = document.querySelectorAll(".more-info-section .container-more-info");
  const priceInfoButtons = document.querySelectorAll(".price-info");
  const dropDownContent = document.querySelectorAll(".dropdown-content");
  moreInfoButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("data-target");
      const targetSection = document.getElementById(targetId);

      // Log the selected container's ID
      console.log("Containe787 r" + targetId);

      moreInfoSections.forEach((section) => {
        if (section === targetSection) {
          if (section.style.display === "none" || section.style.display === "") {
            section.style.display = "block";
            targetSection.scrollIntoView({ behavior: "smooth" }); // This creates a smooth scrolling effect
          } else {
            section.style.display = "none";
          }
        } else {
          section.style.display = "none";
        }
      });
    });
  });

  priceInfoButtons.forEach(button => {
    button.addEventListener("click", function () {  
      
        const target = this.getAttribute("data-target");
        const targetContainer = document.querySelector(`.${target}`);

        if (targetContainer) {
            // Open the target price card section
            targetContainer.classList.add('open');
            
  
            
            // Update the carousel to display the price card section
            currentPageIndex = Array.from(carouselContainers).indexOf(targetContainer);
           
        }
    });
});
  dropDownContent.forEach(button => {
    button.addEventListener("click", function () {  
      
        const target = this.getAttribute("data-target");
        const targetContainer = document.querySelector(`.${target}`);

        if (targetContainer) {
            // Open the target price card section
            targetContainer.classList.add('open');
            
  
            
            // Update the carousel to display the price card section
            currentPageIndex = Array.from(carouselContainers).indexOf(targetContainer);
           
        }
    });
});
});