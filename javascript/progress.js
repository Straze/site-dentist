document.addEventListener("DOMContentLoaded", function() {
const circularProgress = document.querySelectorAll(".circular-progress");

function startAnimation(entry, observer) {
    entry.forEach((item) => {
        if (item.isIntersecting) {
            const progressBar = item.target;
            const progressValue = progressBar.querySelector(".percentage");
            const innerCircle = progressBar.querySelector(".inner-circle");
            const endValue = Number(progressBar.getAttribute("data-percentage"));
            const progressColor = progressBar.getAttribute("data-progress-color");

            let startValue = 0;

            // Calculate speed based on a formula
            const speed = 1000 * Math.pow(endValue, -1); // You can adjust the formula as needed

            const progress = setInterval(() => {
                startValue++;
                progressValue.textContent = `${startValue}+`;
                progressValue.style.color = progressColor;

                innerCircle.style.backgroundColor = progressBar.getAttribute("data-inner-circle-color");

                const percentageCompleted = (startValue / endValue) * 100;
                progressBar.style.background = `conic-gradient(${progressColor} ${percentageCompleted * 3.6}deg, ${progressBar.getAttribute("data-bg-color")} 0deg)`;

                if (startValue === endValue) {
                    clearInterval(progress);
                }
            }, speed);

            observer.unobserve(progressBar);
        }
    });
}

const observer = new IntersectionObserver(startAnimation, {
    threshold: 0.1,
});

circularProgress.forEach((progressBar) => {
    observer.observe(progressBar);
});

});