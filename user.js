
//----------booking js --------------//

// user.js
async function addRegistration() {
    const firstName = document.getElementById("fn").value;
    const lastName = document.getElementById("ln").value;
    const email = document.getElementById("em").value;
    const mobile = document.getElementById("mb").value;
    const gender = document.getElementById("gen").value;
    const dateOfBirth = document.getElementById("dob").value;
    const address = document.getElementById("add").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const areaPIN = document.getElementById("ap").value;
    const password = document.getElementById("pass").value;
    const confirmPassword = document.getElementById("cpass").value;

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
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error('Failed to add new user');
        }

        const finalData = await response.json();
        console.log(finalData);
    } catch (error) {
        console.error('Error:', error);
    }
}


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


