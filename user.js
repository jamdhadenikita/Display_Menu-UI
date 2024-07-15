
// registration front end and backend connection using javascript

// document.addEventListener('DOMContentLoaded', function() {
//     document.getElementById('registrationForm').addEventListener('submit', addRegistration);
// });

async function addRegistration(event) {
    event.preventDefault();              // Prevent the form from submitting the traditional way

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

///////////////login front end and backend connection using javascript///////////////



// ///////////////////// update food menu///////////////////////////////


async function updateMenu(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const title = document.getElementById("foodTitle").value.trim();
    const description = document.getElementById("foodDescription").value.trim();
    const price = document.getElementById("foodPrice").value.trim();
    const image = document.getElementById("foodImage").files[0];

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('image', image);

    const url = 'http://localhost:8080/api/addfood/saveFood';

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const finalData = await response.json();
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Food added successfully!',
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to add food.',
            });
        }
    } catch (error) {
        console.error("Error:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'An error occurred.',
        });
    }
}

document.querySelector("form").addEventListener("submit", updateMenu);
