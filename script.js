//signup form script.js
document.getElementById("signup-form").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent form submission
  
    var firstName = document.getElementById("first-name").value;
    var lastName = document.getElementById("last-name").value;
    var dateOfBirth = document.getElementById("date-of-birth").value;
    var gender = document.getElementById("gender").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirm-password").value;
  
    // Perform validation
    if (!firstName || !lastName || !dateOfBirth || !gender || !email || !phone || !password || !confirmPassword) {
      alert("Please fill in all the fields.");
      return;
    }
  
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
  
    // All validation passed
    alert("Signup successful!");
    // Redirect to the logged-in page or perform other actions
  });
  

  // login-form script.js
document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent form submission
  
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    // Perform login validation
    if (username === "admin" && password === "password") {
      alert("Login successful!");
      // Redirect to the logged-in page or perform other actions
    } else {
      alert("Invalid username or password. Please try again.");
    }
  });
  
  document.getElementById("forgot-password-link").addEventListener("click", function(e) {
    e.preventDefault(); // Prevent link navigation
  
    var username = document.getElementById("username").value;
  
    // Perform password reset logic
    if (username) {
      alert("Password reset link sent to your email.");
    } else {
      alert("Please enter your username to reset the password.");
    }
  });

  function resetPassword() {
    var emailInput = document.getElementById('emailInput');
    var message = document.getElementById('message');
  
    // Perform validation (e.g., check if email is valid)
  
    // Simulate password reset
    message.innerText = 'Password reset instructions sent to ' + emailInput.value;
  }

  
//Registration from script.js

  document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    var fullName = document.getElementById("fullName").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var attendees = document.getElementById("attendees").value;
    var comments = document.getElementById("comments").value;

    // Get selected options
    var options = [];
    var checkboxes = document.getElementsByName("options");
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            options.push(checkbox.value);
        }
    });

    // Display submitted data
    console.log("Full Name: " + fullName);
    console.log("Email:" + email);