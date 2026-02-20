
window.addEventListener('load', () => {
    setTimeout(() => {
        const imageWithLabel = document.querySelector('.image-with-label');
        imageWithLabel.classList.add('active');
    }, 1000); // 10 seconds in milliseconds
});