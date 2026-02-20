function scrollToElement(id) {
  var element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}
document.addEventListener("DOMContentLoaded", function() {
  // Your JavaScript code here

// Get references to your navbar buttons
var galerieButton = document.getElementById("galerie-button");
var proceduriButton = document.getElementById("proceduri-button");
var contactButton = document.getElementById("contact-button");
var galerieButton1 = document.getElementById("galerie-button1");
var contactButton1 = document.getElementById("contact-button1");
// Add click event listeners to your navbar buttons
galerieButton.addEventListener("click", function (e) {
  e.preventDefault(); // Prevent the default link behavior
  scrollToElement("galerie1");
});

contactButton.addEventListener("click", function (e) {
  e.preventDefault(); // Prevent the default link behavior
  scrollToElement("contact1");
});

// Add click event listeners to your navbar buttons
galerieButton1.addEventListener("click", function (e) {
  e.preventDefault(); // Prevent the default link behavior
  scrollToElement("galerie1");
});

contactButton1.addEventListener("click", function (e) {
  e.preventDefault(); // Prevent the default link behavior
  scrollToElement("contact1");
});
});