document.addEventListener("DOMContentLoaded", function () {
  // Initialize EmailJS with your User ID
  emailjs.init("CPvgXiI5Pc4rr0wR2");

  const contactForm = document.getElementById("contact-form");
  const submitButton = contactForm.querySelector('button[type="submit"]');

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Change button state during sending
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = "<span>Sending...</span>";
    submitButton.disabled = true;

    // Get form data
    const templateParams = {
      from_name: document.getElementById("name").value,
      from_email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
      reply_to: document.getElementById("email").value, // For auto-reply
    };

    // Send form submission to your email
    emailjs
      .send("service_n1441ir", "template_k9enbko", templateParams)
      .then(function (response) {
        console.log(
          "Form submission sent successfully!",
          response.status,
          response.text
        );

        // Send auto-reply to the user
        emailjs
          .send("service_n1441ir", "template_gb81jzk", templateParams)
          .then(
            function (autoReplyResponse) {
              console.log(
                "Auto-reply sent successfully!",
                autoReplyResponse.status,
                autoReplyResponse.text
              );

              // Show success message
              const successMessage = document.createElement("div");
              successMessage.className = "success-message";
              successMessage.innerHTML = `
              <div style="padding: 1rem; background-color: #10B981; color: white; border-radius: 0.5rem; margin-bottom: 1rem;">
                <p style="margin: 0;">Message sent successfully! Check your email for a confirmation.</p>
              </div>
            `;
              contactForm.prepend(successMessage);

              // Reset form
              contactForm.reset();

              // Reset button
              submitButton.innerHTML = originalButtonText;
              submitButton.disabled = false;

              // Remove success message after 5 seconds
              setTimeout(() => {
                successMessage.remove();
              }, 5000);
            },
            function (autoReplyError) {
              console.log("Auto-reply failed...", autoReplyError);

              // Show partial success message
              const partialSuccessMessage = document.createElement("div");
              partialSuccessMessage.className = "success-message";
              partialSuccessMessage.innerHTML = `
              <div style="padding: 1rem; background-color: #10B981; color: white; border-radius: 0.5rem; margin-bottom: 1rem;">
                <p style="margin: 0;">Message sent, but auto-reply failed. I'll get back to you soon!</p>
              </div>
            `;
              contactForm.prepend(partialSuccessMessage);

              // Reset form
              contactForm.reset();

              // Reset button
              submitButton.innerHTML = originalButtonText;
              submitButton.disabled = false;

              // Remove message after 5 seconds
              setTimeout(() => {
                partialSuccessMessage.remove();
              }, 5000);
            }
          );
      })
      .catch(function (error) {
        console.log("Form submission failed...", error);

        // Show error message
        const errorMessage = document.createElement("div");
        errorMessage.className = "error-message";
        errorMessage.innerHTML = `
          <div style="padding: 1rem; background-color: #EF4444; color: white; border-radius: 0.5rem; margin-bottom: 1rem;">
            <p style="margin: 0;">Failed to send message. Please try again later or contact me directly at srishsitikhu07@gmail.com.</p>
          </div>
        `;
        contactForm.prepend(errorMessage);

        // Reset button
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;

        // Remove error message after 5 seconds
        setTimeout(() => {
          errorMessage.remove();
        }, 5000);
      });
  });

  // Form validation - real-time feedback
  const formInputs = contactForm.querySelectorAll("input, textarea");

  formInputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateInput(this);
    });

    input.addEventListener("input", function () {
      if (this.classList.contains("invalid")) {
        validateInput(this);
      }
    });
  });

  function validateInput(input) {
    if (input.value.trim() === "") {
      input.classList.add("invalid");
      input.style.borderColor = "#EF4444";

      // Add error message if it doesn't exist
      let errorElement = input.parentNode.querySelector(".error-text");
      if (!errorElement) {
        errorElement = document.createElement("span");
        errorElement.className = "error-text";
        errorElement.style.color = "#EF4444";
        errorElement.style.fontSize = "0.75rem";
        errorElement.style.marginTop = "0.25rem";
        errorElement.textContent = "This field is required";
        input.parentNode.appendChild(errorElement);
      }
    } else {
      // For email validation
      if (input.type === "email" && !isValidEmail(input.value)) {
        input.classList.add("invalid");
        input.style.borderColor = "#EF4444";

        let errorElement = input.parentNode.querySelector(".error-text");
        if (!errorElement) {
          errorElement = document.createElement("span");
          errorElement.className = "error-text";
          errorElement.style.color = "#EF4444";
          errorElement.style.fontSize = "0.75rem";
          errorElement.style.marginTop = "0.25rem";
          errorElement.textContent = "Please enter a valid email address";
          input.parentNode.appendChild(errorElement);
        } else {
          errorElement.textContent = "Please enter a valid email address";
        }
      } else {
        input.classList.remove("invalid");
        input.style.borderColor = "";

        const errorElement = input.parentNode.querySelector(".error-text");
        if (errorElement) {
          errorElement.remove();
        }
      }
    }
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});

// Instructions for setting up EmailJS auto-reply:
/*
  1. Ensure your EmailJS account is set up at https://www.emailjs.com/.
  2. Verify your service ID: service_n1441ir
  3. Verify your form submission template ID: template_k9enbko
  4. Create an auto-reply template in EmailJS with variables:
     - {{from_name}} - Sender's name
     - {{from_email}} - Sender's email (recipient of auto-reply)
     - {{subject}} - Email subject
     - {{message}} - Email message
  5. Replace YOUR_AUTO_REPLY_TEMPLATE_ID with the auto-reply template ID.
  6. Test the form to ensure:
     - Form submission is sent to srishsitikhu07@gmail.com.
     - Auto-reply is sent to the user's email (from_email).
*/
