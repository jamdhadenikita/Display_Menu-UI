    //  registration form

// async function registration() {
//     const fname = document.getElementById('fn').value;
//     const lname = document.getElementById('ln').value;
//     const email = document.getElementById('em').value;
//     const mobile = document.getElementById('mb').value;
//     const gender = document.getElementById('gen').value;
//     const dateofbirth = document.getElementById('dob').value;
//     const address = document.getElementById('add').value;
//     const city = document.getElementById('city').value;
//     const state = document.getElementById('state').value;
//     const areapin = document.getElementById('ap').value;
//     const pass = document.getElementById('pass').value;
//     const cpass = document.getElementById('cpass').value;

//     const registrationdata = {
//         fname: fname,
//         lname: lname,
//         email: email,
//         mobile: mobile,
//         gender: gender,
//         dateofbirth: dateofbirth,
//         address: address,
//         city: city,
//         state: state,
//         areapin: areapin,
//         pass: pass,
//         cpass: cpass
//     };

//     const url = "http://localhost:8080/api/registrations/saveInfo";
//     const apiData = await fetch(url, {
//         method: 'POST',
//         body: JSON.stringify(registrationdata),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });

//     const finaldata = await apiData.json(); // await is needed here to parse the JSON response
//     console.log(finaldata);
// }
function validateForm() {
    const firstName = document.getElementById('fn').value;
    const lastName = document.getElementById('ln').value;
    const email = document.getElementById('em').value;
    const mobile = document.getElementById('mb').value;
    const gender = document.getElementById('gen').value;
    const dateOfBirth = document.getElementById('dob').value;
    const address = document.getElementById('add').value;
    const city = document.getElementById('city').value;
    const areaPIN = document.getElementById('ap').value;
    const state = document.getElementById('state').value;
    const password = document.getElementById('pass').value;
    const confirmPassword = document.getElementById('cpass').value;

    // Simple validation example: check if all fields are filled
    if (!firstName || !lastName || !email || !mobile || !gender || !dateOfBirth || !address || !city || !areaPIN || !state || !password || !confirmPassword) {
        alert("Please fill out all fields");
        return false;
    }

    // Additional validation logic can be added here (e.g., password matching)
    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return false;
    }

    // Example: Validate email format using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Invalid email address");
        return false;
    }

    // Example: Validate mobile number format (assuming 10 digits)
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
        alert("Invalid mobile number (should be 10 digits)");
        return false;
    }

    // Example: Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateOfBirth)) {
        alert("Invalid date format (should be YYYY-MM-DD)");
        return false;
    }

    // All validations passed
    return true;
}

      //******* add/update food js*********//
document.getElementById("foodForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch('/api/food/add', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById("reg-response").innerText = data;
    })
    .catch(error => {
        document.getElementById("reg-response").innerText = "Error: " + error;
    });
});

function closeForm() {
    document.getElementById("foodForm").reset();
    document.getElementById("reg-response").innerText = "";
}