
// registration front end and backend connection using javascript

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('registrationForm').addEventListener('submit', addRegistration);
});

async function addRegistration(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const firstName = document.getElementById("fn").value.trim();
    const lastName = document.getElementById("ln").value.trim();
    const email = document.getElementById("em").value.trim();
    const mobile = document.getElementById("mb").value.trim();
    const gender = document.getElementById("gen").value;
    const dateOfBirth = document.getElementById("dob").value.trim();
    const address = document.getElementById("add").value.trim();
    const city = document.getElementById("city").value.trim();
    const state = document.getElementById("state").value.trim();
    const areaPIN = document.getElementById("ap").value.trim();
    const password = document.getElementById("pass").value.trim();
    const confirmPassword = document.getElementById("cpass").value.trim();

    // Client-side validation
    if (!firstName || !lastName || !email || !mobile || !gender || !dateOfBirth || !address || !city || !state || !areaPIN || !password || !confirmPassword) {
        alert("All fields are required.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobile: mobile,
        gender: gender,
        dateOfBirth: dateOfBirth,
        address: address,
        city: city,
        state: state,
        areaPIN: areaPIN,
        password: password,
        confirmPassword: confirmPassword
    };

    const url = "http://localhost:8080/api/registrations/saveInfo";
    
    try {
        console.log("Sending data:", userData);  // Log the data being sent
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error('Failed to add new user');
        }

        const finalData = await response.json();
        console.log("Received response:", finalData);  // Log the response

        // Show success alert
        await Swal.fire({
            icon: 'success',
            title: 'Registration Successful',
            text: 'Your registration has been done successfully!',
            confirmButtonText: 'OK'
        });
    } catch (error) {
        console.error('Error:', error);
        await Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: 'There was an error during registration. Please try again.',
            confirmButtonText: 'OK'
        });
    }
}

///////////////login front end and backend connection using javascript

//////////// update food menu
$(document).ready(function(){
    $("form").on("submit", function(event){
        event.preventDefault();

        // Gather form data
        var formData = new FormData(this);
        
        // Make an AJAX request
        $.ajax({
            url: "http://localhost:8080/api/addfood/saveFood", // Replace with your server endpoint
            type: "POST",
            data: formData,
            processData: false,
            contentType: false, // Important for file upload
            success: function(response){
                // Handle the response from the server
                $("#reg-response").text("Food details added successfully!");
            },
            error: function(xhr, status, error){
                // Handle errors
                $("#reg-response").text("An error occurred while adding food details.");
     
             }
        });
    });
    
    // Close button functionality
    $(".close-button").on("click", function(){
        // Reset the form
        $("form")[0].reset();
        // Clear the response message
        $("#reg-response").text("");
    });
});


/////////////////////////////////////////////////////////////////
// document.addEventListener("DOMContentLoaded", function() {
//     const form = document.getElementById("registrationForm");

//     if (form) {
//         form.addEventListener("submit", function(event) {
//             event.preventDefault(); // Prevent the form from submitting the traditional way

//             // Validate form before submission
//             if (validateForm()) {
//                 const formData = {
//                     firstName: document.getElementById("fn").value,
//                     lastName: document.getElementById("ln").value,
//                     email: document.getElementById("em").value,
//                     mobile: document.getElementById("mb").value,
//                     gender: document.getElementById("gen").value,
//                     dateOfBirth: document.getElementById("dob").value,
//                     address: document.getElementById("add").value,
//                     city: document.getElementById("city").value,
//                     state: document.getElementById("state").value,
//                     areaPIN: document.getElementById("ap").value,
//                     password: document.getElementById("pass").value,
//                     confirmPassword: document.getElementById("cpass").value
//                 };

//                 // Make the POST request
//                 fetch("http://localhost:8080/api/registrations/saveInfo", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json"
//                     },
//                     body: JSON.stringify(formData)
//                 })
//                 .then(response => {
//                     if (response.ok) {
//                         console.log("response gotted!!")
//                         return response.json();
//                     } 
//                     else {
//                         throw new Error('Failed to submit form');
//                     }
//                 })
//                 .then(data => {
//                     console.log("Success:", data);
//                     Swal.fire({
//                         text: "Form submitted successfully!",
//                         duration: 3000, // Duration in milliseconds
//                         gravity: "bottom", // 'top' or 'bottom'
//                         position: "right", // 'left', 'center' or 'right'
//                         backgroundColor: "green",
//                         stopOnFocus: true, // Prevents dismissing of toast on hover/focus
//                     });
//                     // Optionally, you can clear the form or redirect the user
//                     // document.getElementById("registrationForm").reset();
//                 })
//                 .catch(error => {
//                     console.error("Error:", error);
//                     alert("Registration failed. Please try again.");
//                     Swal.fire({
//                         text: "Form Not submitted !",
//                         duration: 3000, // Duration in milliseconds
//                         gravity: "bottom", // 'top' or 'bottom'
//                         position: "right", // 'left', 'center' or 'right'
//                         backgroundColor: "green",
//                         stopOnFocus: true, // Prevents dismissing of toast on hover/focus
//                     });
//                 });
//             }
//         });
//     } else {
//         console.error("Form element not found.");
//     }
// });

// function validateForm() {
//     const password = document.getElementById("pass").value;
//     const confirmPassword = document.getElementById("cpass").value;
    
//     if (password !== confirmPassword) {
//         alert("Passwords do not match.");
//         return false;
//     }

//     return true;
// }


