  document.addEventListener("DOMContentLoaded", function() {

  var radioButtons = document.querySelectorAll('input[type=radio][name=slider]');
  var currentRadioIndex = 0;
  console.log('Button element:', cycleButton2);

  var cycleButton2 = document.getElementById('cycleButton2');
  var cycleButton3 = document.getElementById('cycleButton3');
  var sliderContents = document.querySelectorAll('.slider__contents');

  if (cycleButton2) {
    cycleButton2.addEventListener('click', function () {
      radioButtons[currentRadioIndex].checked = false;
      sliderContents[currentRadioIndex].style.left = '-100%';
      currentRadioIndex = (currentRadioIndex + 1) % radioButtons.length;
      radioButtons[currentRadioIndex].checked = true;
      sliderContents[currentRadioIndex].style.left = '0%';
    });
  }

   if (cycleButton3) {
  cycleButton3.addEventListener('click', function () {
    radioButtons[currentRadioIndex].checked = false;

    // Calculate the previous index and ensure it stays within bounds
    currentRadioIndex = (currentRadioIndex - 1 + radioButtons.length) % radioButtons.length;

    sliderContents[currentRadioIndex].style.left = '0%';
    radioButtons[currentRadioIndex].checked = true;
    sliderContents[currentRadioIndex].style.left = '0%';
  });
}

});