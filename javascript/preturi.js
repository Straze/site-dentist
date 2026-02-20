// Get references to all toggle buttons
const toggleButtons = document.querySelectorAll('.toggleButton');

// Function to toggle the visibility of the container
function toggleContainer(container, arrowIcon, gridElements) {
    if (container.style.display === 'none' || container.style.display === '') {
        container.style.display = 'block';
        arrowIcon.src = 'photos/arrow-down.png'; // Change to the down arrow image source
        container.classList.add('open'); // Add the 'open' class for animation
        animateElements(gridElements);
    } else {
        // Add a class to trigger the closing animation
        container.classList.remove('open');
        arrowIcon.src = 'photos/arrow-right.png'; // Change back to the right arrow image source

        // Listen for the 'transitionend' event to hide the container after the animation
        container.addEventListener('transitionend', () => {
            container.style.display = 'none';
        }, { once: true });
        
        // Reset the animation properties after a short delay
        setTimeout(() => {
            gridElements.forEach((element) => {
                element.style.opacity = 0;
                element.style.transform = 'translateX(100%)';
            });
        }, 50); // Adjust the delay time as needed (e.g., 50ms)
    }
}

// Function to animate elements with a delay
function animateElements(elements) {
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = 1;
            element.style.transform = 'translateX(0)';
        }, index * 50); // Adjust the delay time as needed (e.g., 100ms)
    });
}

// Add click event listeners to all toggle buttons
toggleButtons.forEach((toggleButton) => {
    toggleButton.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent the default behavior (scrolling to the top)

        // Get the associated container and arrow icon
        const containerId = toggleButton.getAttribute('data-container');
        const container = document.getElementById(containerId);
        const arrowIcon = toggleButton.querySelector('img');

        if (!container || !arrowIcon) {
            return; // Exit if the container or arrowIcon is not found
        }

        // Get the grid elements within the container
        const gridElements = container.querySelectorAll('.grid-2-5-consultatie');

        // Toggle the visibility of the container and arrow
        toggleContainer(container, arrowIcon, gridElements);
    });
});

// Initialize the containers and arrows to their initial state
toggleButtons.forEach((toggleButton) => {
    const containerId = toggleButton.getAttribute('data-container');
    const container = document.getElementById(containerId);
    const arrowIcon = toggleButton.querySelector('img');

    if (!container || !arrowIcon) {
        return;
    }

    container.style.display = 'none'; // Initial state is hidden
    arrowIcon.src = 'photos/arrow-right.png'; // Initial arrow position is right
});
