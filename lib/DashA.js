let menuicn = document.querySelector(".menuicn");
let nav = document.querySelector(".navcontainer");

menuicn.addEventListener("click", () => {
    nav.classList.toggle("navclose");
})


// URL to fetch user data
const fetchUsersUrl = "http://localhost:8080/api/registrations/getallregisteruser";
const deleteUserUrl = "http://localhost:8080/api/registrations/delete";

// Fetch and populate user data when "View All" button is clicked
document.getElementById("fetchUsersBtn").addEventListener("click", () => {
  fetch(fetchUsersUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      return response.json();
    })
    .then((users) => populateUserTable(users))
    .catch((error) => {
      console.error("Error fetching users:", error);
      Swal.fire("Error", "Could not fetch user data. Try again later.", "error");
    });
});

// Function to populate the table with user data
function populateUserTable(users) {
  const userTableBody = document.querySelector("#userTable tbody");
  userTableBody.innerHTML = ""; // Clear the existing rows

  users.forEach((user) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${user.firstName}</td>
      <td>${user.lastName}</td>
      <td>${user.email}</td>
      <td>${user.mobile}</td>
      <td>${user.gender}</td>
      <td>${user.dob}</td>
      <td>${user.address}</td>
      <td>${user.city}</td>
      <td>${user.pin}</td>
      <td>${user.state}</td>
      <td>
        <button class="edit-btn" data-id="${user.id}">Edit</button>
        <button class="delete-btn" data-id="${user.id}">Delete</button>
      </td>
    `;
    userTableBody.appendChild(row);
  });

  addEventListeners();
}

// Function to add event listeners for delete and edit buttons
function addEventListeners() {
  // Delete buttons
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const userId = button.getAttribute("data-id");
      deleteUser(userId);
    });
  });

  // Edit buttons
  const editButtons = document.querySelectorAll(".edit-btn");
  editButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const userId = button.getAttribute("data-id");
      editUser(userId);
    });
  });
}

// Function to delete a user
function deleteUser(userId) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`${deleteUserUrl}/${userId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete user");
          }
          Swal.fire("Deleted!", "User has been deleted.", "success");
          document.getElementById("fetchUsersBtn").click(); // Refresh the table
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          Swal.fire("Error", "Could not delete user. Try again later.", "error");
        });
    }
  });
}

// Function to edit a user (you can expand this as needed)
function editUser(userId) {
  Swal.fire({
    title: "Edit User",
    html: `
      <input type="text" id="editFirstName" class="swal2-input" placeholder="First Name">
      <input type="text" id="editLastName" class="swal2-input" placeholder="Last Name">
      <input type="email" id="editEmail" class="swal2-input" placeholder="Email">
    `,
    showCancelButton: true,
    confirmButtonText: "Save",
    cancelButtonText: "Cancel",
    preConfirm: () => {
      return {
        firstName: document.getElementById("editFirstName").value,
        lastName: document.getElementById("editLastName").value,
        email: document.getElementById("editEmail").value,
      };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const updatedUser = result.value;
      fetch(`${fetchUsersUrl}/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update user");
          }
          Swal.fire("Updated!", "User details have been updated.", "success");
          document.getElementById("fetchUsersBtn").click(); // Refresh the table
        })
        .catch((error) => {
          console.error("Error updating user:", error);
          Swal.fire("Error", "Could not update user. Try again later.", "error");
        });
    }
  });
}

  