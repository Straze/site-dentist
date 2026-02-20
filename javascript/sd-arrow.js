document.addEventListener("DOMContentLoaded", function() {
    const scrollDownLink = document.querySelector('.scroll-down');
    const welcomeSlide = document.querySelector('.welcome');

    scrollDownLink.addEventListener('click', function(event) {
        event.preventDefault();
        const targetOffset = welcomeSlide.clientHeight - window.innerHeight;
        window.scrollTo({ top: targetOffset, behavior: 'smooth' });
    });
});