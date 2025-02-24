// script.js

document.addEventListener("DOMContentLoaded", function () {
    // CONTACT FORM VALIDATION
    const contactForm = document.getElementById("contactForm");
    const contactSuccessMsg = document.getElementById("contactSuccessMsg");
  
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
  
        // Simple front-end validation
        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const message = document.getElementById("contactMessage").value.trim();
  
        if (!name || !email || !message) {
          alert("Please fill in the required fields.");
          return;
        }
  
        // Basic email format check
        if (!validateEmail(email)) {
          alert("Please enter a valid email address.");
          return;
        }
  
        // If validation passes, show success message
        contactSuccessMsg.style.display = "block";
  
        // Reset form
        contactForm.reset();
      });
    }
  
    // GET A QUOTE MULTI-STEP FORM
    const quoteForm = document.getElementById("quoteForm");
    const formSteps = document.querySelectorAll(".form-step");
    const nextBtns = document.querySelectorAll(".next-btn");
    const prevBtns = document.querySelectorAll(".prev-btn");
    const quoteSuccessMsg = document.getElementById("quoteSuccessMsg");
  
    let currentStep = 0;
  
    // Show the first step by default
    if (formSteps.length > 0) {
      formSteps[currentStep].classList.add("active");
    }
  
    // Next buttons
    nextBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        if (!validateStep(currentStep)) return; // Validate step before moving on
        formSteps[currentStep].classList.remove("active");
        currentStep++;
        formSteps[currentStep].classList.add("active");
      });
    });
  
    // Previous buttons
    prevBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        formSteps[currentStep].classList.remove("active");
        currentStep--;
        formSteps[currentStep].classList.add("active");
      });
    });
  
    // Submit Event
    if (quoteForm) {
      quoteForm.addEventListener("submit", function (e) {
        e.preventDefault();
  
        // Final step validation
        if (!validateStep(currentStep)) return;
  
        // If all is good, show success message
        quoteSuccessMsg.style.display = "block";
  
        // Reset form
        quoteForm.reset();
  
        // Hide the form or reset to first step
        formSteps[currentStep].classList.remove("active");
        currentStep = 0;
        formSteps[currentStep].classList.add("active");
      });
    }
  
    // VALIDATE EMAIL FUNCTION
    function validateEmail(email) {
      // Basic regex for demonstration
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
  
    // VALIDATE CURRENT STEP
    function validateStep(stepIndex) {
      const inputs = formSteps[stepIndex].querySelectorAll("input, textarea, select");
  
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].hasAttribute("required") && !inputs[i].value.trim()) {
          alert("Please fill in all required fields.");
          return false;
        }
        if (inputs[i].type === "email" && !validateEmail(inputs[i].value.trim())) {
          alert("Please enter a valid email address.");
          return false;
        }
      }
  
      return true;
    }
  });
  