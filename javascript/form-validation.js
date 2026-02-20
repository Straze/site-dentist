function validateForm() {
  var nameInput = document.getElementById("name1");
var phoneInput = document.getElementById("phone_number1");
var emailInput = document.getElementById("email1");
var messageInput = document.getElementById("message1");
var contactMethod = document.querySelector('input[name="contactMethod"]:checked');
var nameBubble = document.getElementById("name1-bubble");
var phoneBubble = document.getElementById("phone_number1-bubble");
var emailBubble = document.getElementById("email1-bubble");
var messageBubble = document.getElementById("message1-bubble");
var contactMethodBubble = document.getElementById("contactMethod-bubble");
var hasValidationError = false; // Variable to track whether a previous validation error occurred

  // Clear existing notifications
  nameBubble.textContent = "";
  phoneBubble.textContent = "";
  emailBubble.textContent = "";
  messageBubble.textContent = "";

 function displayNotification(element, message) {
  element.textContent = message;
  element.style.opacity = 1;
  setTimeout(function () {
    element.style.opacity = 0;
  }, 2000); // Hide after 3 seconds (adjust as needed)
}
  var isValid = true;

 var hasValidationError = false; // Variable to track whether a previous validation error occurred

if (nameInput.value.trim() === "") {
  if (!hasValidationError) {
    displayNotification(nameBubble, "Numele este obligatoriu!");
    hasValidationError = true; // Set the flag to true
  }
  isValid = false;
}
if (phoneInput.value.trim() === "") {
  if (!hasValidationError) {
    displayNotification(phoneBubble, "Numarul de telefon este obligatoriu!");
    hasValidationError = true; // Set the flag to true
  }
  isValid = false;
}
var phonePattern = /^[0-9]+$/;

if (!phonePattern.test(phoneInput.value.trim())) {
  if (!hasValidationError) {
    displayNotification(phoneBubble, "Trebuie sa contina doar cifre!");
    hasValidationError = true; // Set the flag to true
  }
  isValid = false;
}



if (emailInput.value.trim() === "") {
  if (!hasValidationError) {
    displayNotification(emailBubble, "Adresa de email este obligatorie!");
    hasValidationError = true; // Set the flag to true
  }
  isValid = false;
}
var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
if (!emailPattern.test(emailInput.value.trim())) {
  if (!hasValidationError) {
    displayNotification(emailBubble, "Adresa de email nu este valida!");
    hasValidationError = true; // Set the flag to true
  }
  isValid = false;
}



if (!contactMethod) {
  if (!hasValidationError) {
    displayNotification(
      contactMethodBubble,
      "Selecteaza o metoda de contact!"
    );
    hasValidationError = true; // Set the flag to true
  }
  isValid = false;
}

return isValid;
}
  
function clearFormFields() {
  document.getElementById("name1").value = "";
  document.getElementById("email1").value = "";
  document.getElementById("message1").value = "";
  document.getElementById("phone_number1").value = "";
  var contactMethodRadioButtons = document.querySelectorAll('input[name="contactMethod"]');
  contactMethodRadioButtons.forEach(function (radioButton) {
    radioButton.checked = false;
  });
}
function sendMail() {
  hideSuccessMessage(); // Start by hiding the success message
  hideErrorMessage(); // Start by hiding the error message

  if (validateForm()) {
    var contactMethodRadioButtons = document.querySelectorAll('input[name="contactMethod"]:checked');
    var selectedContactMethod = contactMethodRadioButtons[0] ? contactMethodRadioButtons[0].value : '';

    if (selectedContactMethod) {
      var params = {
        name1: document.getElementById("name1").value,
        phone_number1: document.getElementById("phone_number1").value,
        email1: document.getElementById("email1").value,
        message1: document.getElementById("message1").value,
        contactMethod: selectedContactMethod
      };

      const serviceID = "service_kopmvmq";
      const templateID = "template_2mg7qrl";

      emailjs.send(serviceID, templateID, params)
        .then(function (response) {
          console.log("Vei fi contactat in cel mai scurt timp.", response);
          clearFormFields();
          displaySuccessMessage(" Vei fi contactat in cel mai scurt timp.");
        })
        .catch(function (error) {
          console.log("Incearca din nou sau suna la numarul nostru 0799.399.599", error);
          displayErrorMessage("Incearca din nou sau suna la numarul nostru 0799.399.599");
        });
    } else {
      displayErrorMessage("Selecteaza o metoda de contact.");
    }
  }
}


function displaySuccessMessage(message) {
  var successMessage = document.getElementById("success-message");
  successMessage.textContent = message;
  successMessage.style.display = "block"; // Show the success message
}

function hideSuccessMessage() {
  var successMessage = document.getElementById("success-message");
  successMessage.textContent = "";
  successMessage.style.display = "none"; // Hide the success message
}

function displayErrorMessage(message) {
  var errorMessage = document.getElementById("error-message");
  errorMessage.textContent = message;
  errorMessage.style.display = "block"; // Show the error message
}

function hideErrorMessage() {
  var errorMessage = document.getElementById("error-message");
  errorMessage.textContent = "";
  errorMessage.style.display = "none"; // Hide the error message
}
