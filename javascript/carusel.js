
document.addEventListener("DOMContentLoaded", function() {
    const priceSlideButtons = document.querySelectorAll(".price-slide");
    const priceSlideButtons2 = document.querySelectorAll(".price-slide2");
    const priceSlideButtons3 = document.querySelectorAll(".price-slide3");
    const priceSlideButtons4 = document.querySelectorAll(".price-slide4");
    const priceSlideButtons5 = document.querySelectorAll(".price-slide5");
    const priceSlideButtons6 = document.querySelectorAll(".price-slide6");
    const pricesSlide = document.querySelectorAll(".prices-slide");

     // carousel height 
    const part1 = document.querySelector(".carousel-container");
    const part2 = document.querySelector(".carousel-slide");


    const secondSlideProcedures = document.querySelector(".secondSlide-procedures");
    const scheduleButton = document.querySelectorAll(".appointment")
    const backButtons = document.querySelectorAll(".back-button")

    const carouselContainers = document.querySelectorAll(".container-preturi.group");
      const carouselSlide = document.querySelector('.carousel-slide');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const containerMoreInfoSections = document.querySelectorAll(".container-more-info");

    // sections
    const shapeSection = document.querySelector(".custom-shape-divider-bottom-1694619511");
    const shapeSection2 = document.querySelector(".custom-shape-divider-bottom-1694118945");
    const reviewSection = document.querySelector(".container-reviews");
    const galerySection = document.querySelector("#carousel");
    const galeryButtonsSection = document.querySelector(".carousel-buttons");
    const contactSection = document.querySelector(".contact-section");
    const headerPhoto = document.querySelector(".photo-align");
    const procedureSection = document.querySelector(".procedures-section");
    const wpuSection = document.querySelector(".why-pick-us-section");
    const moreInfoSections = document.querySelectorAll(".more-info-section .container-more-info");

  
    // sets carousel counter to 0 when the page gets loaded
    let counter = 0;
    updateSlideStyles();
    // create constant with the width of home page to determine width of each page
    const slideWidth = carouselItems[0].clientWidth;
    // controls the positioning of the view to make sure pages are seen as intended
    carouselSlide.style.transform = `translateX(${-slideWidth * counter}px)`;
    
    // hides more info sections on load
    moreInfoSections.forEach((section, index) => {
      section.style.display = "none";
  });
    
    // makes visible the more info section when switching to the second page from first or third page
    function updateMoreInfoVisibility() {
      if (counter === 1) {
          moreInfoSections[0].style.display = 'block';   
      } else {
          moreInfoSections[0].style.display = 'none'; 
      }
  }

 function updateSlideStyles() {
  // Get the screen width
  var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  if (counter === 0) {
    if (screenWidth <= 1000) {
      part1.style.height = '800px';
      part2.style.height = '800px';
    } else {
      part1.style.height = '900px'; 
      part2.style.height = '900px';
    }
  } else if (counter === 1) {
    if (screenWidth <= 1000) {
      part1.style.height = '10px';
      part2.style.height = '5px';
    } else {
      part1.style.height = '1000px';
      part2.style.height = '1000px';
    }
  } else if (counter === 2) {
    part1.style.height = 'auto';
    part2.style.height = 'auto';
  }
}

// Call the function when the window is resized
window.addEventListener('resize', updateSlideStyles);

// call this function whenever the counter changes
function onCounterChange() {
  // update styles based on the current counter value
  updateSlideStyles();

}

      function proceduresLoad() {

      secondSlideProcedures.style.display = 'block';

  }
   function proceduresUnload() {
      // mobile
      secondSlideProcedures.style.display = 'none';

      // desktop 
      // created loop to check if there is a procedure open to unload it when switching from the second slide
      for (var i = 1; i <= 9; i++) {
        var currentElement = document.getElementById('more-info-' + i);
        
        if (currentElement.style.display === 'block') {
            currentElement.style.display = 'none';
            break; 
        }
    }
  }
      function handleButtonClick() {

    window.location.href = "index.html";

  }

    function updateFloatingButtonVisibility() {
    const floatingButton = document.querySelector('.floatingButton');
    if (counter === 1 ) {
      // Show the button
      floatingButton.style.display = 'block';
    } else if (counter === 2 ) { 
 floatingButton.style.display = 'block';
    } else {
      // Hide the button
      floatingButton.style.display = 'none';
    }
  }
    const floatingButton = document.querySelector('.floatingButton');
  if (floatingButton) {
    floatingButton.addEventListener('click', handleButtonClick);
  }

    priceSlideButtons3.forEach((button, index) => {
      button.addEventListener("click", function () {
    // Get the data-target attribute value
    const screenWidth = window.innerWidth;
  if (screenWidth <= 999) {
    handleNext();
    hideSections();
    onCounterChange();
    proceduresLoad();
    
    const targetId = this.getAttribute("data-target");
    
    // Hide all container-more-info sections
    containerMoreInfoSections.forEach(section => {
      section.style.display = "none";
    });

    // Show the specific container-more-info section based on targetId
    const targetContainer = document.getElementById(targetId);
    if (targetContainer) {
      targetContainer.style.display = "block";
    

      // Scroll to the contact form element
      targetContainer.scrollIntoView({ behavior: "smooth" }); // This creates a smooth scrolling effect
    } else if (counter === 1) {
      onCounterChange()
    const targetId = this.getAttribute("data-target");
    
    // Hide all container-more-info sections
    containerMoreInfoSections.forEach(section => {
      section.style.display = "none";
    });

    // Show the specific container-more-info section based on targetId
    const targetContainer = document.getElementById(targetId);
    if (targetContainer) {
      targetContainer.style.display = "block";
    

      // Scroll to the contact form element
      targetContainer.scrollIntoView({ behavior: "smooth" }); // This creates a smooth scrolling effect
  }
}
  } else if (screenWidth >= 768) {
    if (counter === 0) {
     handleNext();
    hideSections();
    onCounterChange()
    const targetId = this.getAttribute("data-target");
    
    // Hide all container-more-info sections
    containerMoreInfoSections.forEach(section => {
      section.style.display = "none";
    });

    // Show the specific container-more-info section based on targetId
    const targetContainer = document.getElementById(targetId);
    if (targetContainer) {
      targetContainer.style.display = "block";
    

      // Scroll to the contact form element
      targetContainer.scrollIntoView({ behavior: "smooth" }); // This creates a smooth scrolling effect
  }
} else if (counter === 1) {
   onCounterChange()
    const targetId = this.getAttribute("data-target");
    
    // Hide all container-more-info sections
    containerMoreInfoSections.forEach(section => {
      section.style.display = "none";
    });

    // Show the specific container-more-info section based on targetId
    const targetContainer = document.getElementById(targetId);
    if (targetContainer) {
      targetContainer.style.display = "block";
    

      // Scroll to the contact form element
      targetContainer.scrollIntoView({ behavior: "smooth" }); // This creates a smooth scrolling effect
  }
} else if (counter === 2) {
    handleFSTT();
    onCounterChange();
    const targetId = this.getAttribute("data-target");
    
    // Hide all container-more-info sections
    containerMoreInfoSections.forEach(section => {
      section.style.display = "none";
    });

    // Show the specific container-more-info section based on targetId
    const targetContainer = document.getElementById(targetId);
    if (targetContainer) {
      targetContainer.style.display = "block";
    

      // Scroll to the contact form element
      targetContainer.scrollIntoView({ behavior: "smooth" }); // This creates a smooth scrolling effect
  }
}
}
  });
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // You can change this to 'auto' for instant scrolling
  
  });
  console.log("to top");
}

   priceSlideButtons4.forEach((button, index) => {
  button.addEventListener("click", function () {
    // Get the data-target attribute value
    const screenWidth = window.innerWidth;
  if (screenWidth <= 999) {
    if (counter === 0)
     handlePrev();
      hideSections();
    scrollToTop();
    onCounterChange();
    const targetId = this.getAttribute("data-target");
    
    // Hide all container-more-info sections
    containerMoreInfoSections.forEach(section => {
      section.style.display = "none";
    });

    // Show the specific container-more-info section based on targetId
    const targetContainer = document.getElementById(targetId);
    if (targetContainer) {
      targetContainer.style.display = "block";
    

      // Scroll to the contact form element
      targetContainer.scrollIntoView({ behavior: "smooth" }); // This creates a smooth scrolling effect
    } else if (counter === 1) {
   handlePrev();
    hideSections();
    scrollToTop();
    onCounterChange();
    const targetId = this.getAttribute("data-target");
    
    // Hide all container-more-info sections
    containerMoreInfoSections.forEach(section => {
      section.style.display = "none";
    });

    // Show the specific container-more-info section based on targetId
    const targetContainer = document.getElementById(targetId);
    if (targetContainer) {
      targetContainer.style.display = "block";
    

      // Scroll to the contact form element
      targetContainer.scrollIntoView({ behavior: "smooth" }); // This creates a smooth scrolling effect
  }
}
  } else if (screenWidth >= 768) {
    if (counter === 0) {
     handlePrev();
    hideSections();
      scrollToTop();
      onCounterChange()
    const targetId = this.getAttribute("data-target");
    
    // Hide all container-more-info sections
    containerMoreInfoSections.forEach(section => {
      section.style.display = "none";
    });

    // Show the specific container-more-info section based on targetId
    const targetContainer = document.getElementById(targetId);
    if (targetContainer) {
      targetContainer.style.display = "block";
    

      // Scroll to the contact form element
      targetContainer.scrollIntoView({ behavior: "smooth" }); // This creates a smooth scrolling effect
  }
} else if (counter === 1) {
      handleSTT();
    hideSections();
scrollToTop();
onCounterChange()
    const targetId = this.getAttribute("data-target");
    
    // Hide all container-more-info sections
    containerMoreInfoSections.forEach(section => {
      section.style.display = "none";
    });

    // Show the specific container-more-info section based on targetId
    const targetContainer = document.getElementById(targetId);
    if (targetContainer) {
      targetContainer.style.display = "block";
    

      // Scroll to the contact form element
      targetContainer.scrollIntoView({ behavior: "smooth" }); // This creates a smooth scrolling effect
  }
}
}
  });
});

 priceSlideButtons5.forEach((button, index) => {
  button.addEventListener("click", function () {
    // Get the data-target attribute value
    const screenWidth = window.innerWidth;
  if (screenWidth <= 999) {
    hideSections();
    onCounterChange();
    proceduresLoad();
    
    const targetId = this.getAttribute("data-target");
    
    // Hide all container-more-info sections
    containerMoreInfoSections.forEach(section => {
      section.style.display = "none";
    });

    // Show the specific container-more-info section based on targetId
    const targetContainer = document.getElementById(targetId);
    if (targetContainer) {
      targetContainer.style.display = "block";
    

      // Scroll to the contact form element
      targetContainer.scrollIntoView({ behavior: "smooth" }); // This creates a smooth scrolling effect
    } else if (counter === 1) {
   
    const targetId = this.getAttribute("data-target");
    
    // Hide all container-more-info sections
    containerMoreInfoSections.forEach(section => {
      section.style.display = "none";
    });

    // Show the specific container-more-info section based on targetId
    const targetContainer = document.getElementById(targetId);
    if (targetContainer) {
      targetContainer.style.display = "block";
    

      // Scroll to the contact form element
      targetContainer.scrollIntoView({ behavior: "smooth" }); // This creates a smooth scrolling effect
  }
}
  } else if (screenWidth >= 768) {
    if (counter === 0) {
     handleNext();
    hideSections();
    onCounterChange()
    const targetId = this.getAttribute("data-target");
    
    // Hide all container-more-info sections
    containerMoreInfoSections.forEach(section => {
      section.style.display = "none";
    });

    // Show the specific container-more-info section based on targetId
    const targetContainer = document.getElementById(targetId);
    if (targetContainer) {
      targetContainer.style.display = "block";
    

      // Scroll to the contact form element
      targetContainer.scrollIntoView({ behavior: "smooth" }); // This creates a smooth scrolling effect
  }
} else if (counter === 1) {
   
    const targetId = this.getAttribute("data-target");
    
    // Hide all container-more-info sections
    containerMoreInfoSections.forEach(section => {
      section.style.display = "none";
    });

    // Show the specific container-more-info section based on targetId
    const targetContainer = document.getElementById(targetId);
    if (targetContainer) {
      targetContainer.style.display = "block";
    

      // Scroll to the contact form element
      targetContainer.scrollIntoView({ behavior: "smooth" }); // This creates a smooth scrolling effect
  }
} else if (counter === 2) {
    handleFSTT();
    onCounterChange()
    const targetId = this.getAttribute("data-target");
    
    // Hide all container-more-info sections
    containerMoreInfoSections.forEach(section => {
      section.style.display = "none";
    });

    // Show the specific container-more-info section based on targetId
    const targetContainer = document.getElementById(targetId);
    if (targetContainer) {
      targetContainer.style.display = "block";
    

      // Scroll to the contact form element
      targetContainer.scrollIntoView({ behavior: "smooth" }); // This creates a smooth scrolling effect
  }
}
}
  });
});

      function hideVisibleElement() {
      
}

      let isSimulatingClick = false; 
priceSlideButtons6.forEach((button, index) => {
  button.addEventListener("click", function () {
      extraSlide();
      showSections();
      proceduresUnload();
      onCounterChange();

        // check if the clicked button is one of the specific buttons
        if (!isSimulatingClick) {
            // set flag to true to indicate that a click is being simulated
            isSimulatingClick = true;

            // wait for 500ms and then trigger a second click
            setTimeout(() => {
                button.click();
                // reset the flag
                isSimulatingClick = false;
            }, 250);
        }
  });
});

  console.log("Counter" + counter);

  function slideCarousel() {
        console.log('Sliding to counter:', counter);
        carouselSlide.style.transition = 'transform 0.5s ease-in-out';
        
        let slideDistanceFactor = 0.73; // Default slide distance factor
        
        const screenWidth = window.innerWidth
    if (screenWidth <= 768) {
          if (counter === 0) {
        slideDistanceFactor = 2; // Slide from first to second
                } else if (counter === 1) {
        slideDistanceFactor = 0.800 ; // Slide from second to third
        } else if (counter === 2) {
        slideDistanceFactor = 0.955 ; // Slide from second to third
        }
    } else if (screenWidth <= 1500 ) {
         if (counter === 0) {
        slideDistanceFactor = 2; // Slide from first to second
                } else if (counter === 1) {
        slideDistanceFactor = 1.01 ; // Slide from second to third
        } else if (counter === 2) {
        slideDistanceFactor = 0.955 ; // Slide from second to third
        }
    } else 
            if (counter === 0) {
        slideDistanceFactor = 2; // Slide from first to second
                } else if (counter === 1) {
        slideDistanceFactor = 0.900 ; // Slide from second to third
        } else if (counter === 2) {
        slideDistanceFactor = 0.955 ; // Slide from second to third
        }

        updateMoreInfoVisibility();
        carouselSlide.style.transform = `translateX(${-slideWidth * counter * slideDistanceFactor}px)`;
        updateFloatingButtonVisibility();
    }
    


    function handleNext() {
        if (counter >= carouselItems.length - 1) {
            carouselSlide.style.transition = 'none';
            counter = 1;
            slideCarousel();
        } else if (counter === 1) {
            
            
        } else  {
            counter++;
            slideCarousel();
        }
    }
    // slide from second to third
      function handleFSTT() {
          if (counter < 0) return;
          counter--;
          slideCarousel();
      }

      // slide to third
     function handleSTT() {
        if (counter <  0) return;
        counter++;
        slideCarousel();
        
    }
    function extraSlide() {
        if (counter === 0) return;
        if (counter === 1) {
          counter--;
          slideCarousel();
        }
         if (counter === 2) {
          counter--;
          counter--;
          slideCarousel();
        }
    }
    function handlePrev() {
        if (counter < 0) return;
        if (counter === 1) {
          counter++
          slideCarousel();
          proceduresUnload();
          return;
        }
         if (counter === 2) {
          counter++
          slideCarousel();
          proceduresUnload();
          return;
        }
        counter++;
        counter++;
        slideCarousel();
    }
    

    priceSlideButtons2.forEach(button => {
    button.addEventListener("click", function () {
        const targetSlide = this.getAttribute("data-target");
        const targetIndex = Array.from(carouselItems).findIndex(item => item.id === targetSlide);

        if (targetIndex !== -1) {
            // Slide to the target slide
            counter = targetIndex;
            slideCarousel();
        }
        hideSections() 
    });
});

    backButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
    handlePrev();
     
  });
});


    scheduleButton.forEach((button, index) => {
    button.addEventListener("click", function () {
    // Show the corresponding contact form
    handleScheduleButtonClick();
    // Scroll to the contact form element
     const contactSectionElement = document.querySelector('.contact-section');
    if (contactSectionElement) {
    contactSectionElement.scrollIntoView({ behavior: "smooth" });
  }
});
});


    function handleScheduleButtonClick(index) {
  // Check if the contactSection is hidden
  if (contactSection.style.display === 'none') {
    // Display the contactSection
    contactSection.style.display = '';
  }
}

    pricesSlide.forEach(button => {
    button.addEventListener("click", function () {

            handleNext();
        hideSections() 
    });
});

priceSlideButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Slide to the next slide (carousel item)
              
            handleNext();     
          
            const target = this.getAttribute("data-target");
            const targetContainer = document.querySelector(`.${target}`);

            if (targetContainer) {
                // Open the target price card section
                targetContainer.classList.add('open');

                // Hide the "Why Pick Us" section
                galerySection.style.display = 'none'; // Add this line
                galeryButtonsSection.style.display = 'none'; // Add this line
              contactSection.style.display = 'none'; // Add this line
                procedureSection.style.display = 'none'; // Add this line
                wpuSection.style.display = 'none';
                reviewSection.style.display = 'none';
                headerPhoto.style.display = 'none';
                shapeSection2.style.display = 'none';
                // Update the carousel to display the price card section
                currentPageIndex = Array.from(carouselContainers).indexOf(targetContainer);
              
            }
        });
    });

   function hideSections() {
  
    galerySection.style.display = 'none';
    galeryButtonsSection.style.display = 'none';
    contactSection.style.display = 'none';
    wpuSection.style.display = 'none';
    reviewSection.style.display = 'none';
    shapeSection.style.display = 'none';
    headerPhoto.style.display = 'none';
    shapeSection2.style.display = 'none';
}
function showSections() {
     galerySection.removeAttribute('style');
   contactSection.removeAttribute('style');
   galeryButtonsSection.removeAttribute('style');
   
    wpuSection.style.display = 'block';
    reviewSection.style.display = 'block';
    shapeSection.style.display = 'block';
    headerPhoto.style.display = 'block';
    shapeSection2.style.display = 'block';
}

    

   updateMoreInfoVisibility();  

      
   
   
 // Listen for slide changes
 carouselSlide.addEventListener('transitionend', () => {
  // Update the current slide index
  currentSlideIndex = Array.from(carouselItems).indexOf(carouselItems[counter]);

});


});