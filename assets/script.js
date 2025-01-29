const API_URL = "https://jsonplaceholder.typicode.com/users";

// DOM Elements
const userTableBody = document.getElementById("userTableBody");
const userFormContainer = document.getElementById("userFormContainer");
const userForm = document.getElementById("userForm");
const addUserBtn = document.getElementById("addUserBtn");
const cancelBtn = document.getElementById("cancelBtn");
const formTitle = document.getElementById("formTitle");

// Form Fields
const userIdField = document.getElementById("userId");
const firstNameField = document.getElementById("firstName");
const lastNameField = document.getElementById("lastName");
const emailField = document.getElementById("email");
const departmentField = document.getElementById("department");

// Fetch and render users
async function fetchUsers() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch users");

        const users = await response.json();
        renderUsers(users);
    } catch (error) {
        alert("Error fetching users.");
    }
}

// Render users in the table
function renderUsers(users) {
    userTableBody.innerHTML = "";
    users.forEach(user => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name.split(" ")[0]}</td>
            <td>${user.name.split(" ")[1] || ""}</td>
            <td>${user.email}</td>
            <td>${user.company.name}</td>
            <td>
                <button onclick="editUser(${user.id})">Edit</button>
                <button onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;

        userTableBody.appendChild(row);
    });
}

// Show add user form
addUserBtn.addEventListener("click", () => {
    userFormContainer.classList.remove("hidden");
    formTitle.textContent = "Add User";
    userForm.reset();
    userIdField.value = "";
});

// Hide form on cancel
cancelBtn.addEventListener("click", () => userFormContainer.classList.add("hidden"));

// Form submission (Add/Edit)
userForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!validateInputs()) return;
    const userData = {
        name: `${firstNameField.value} ${lastNameField.value}`,
        email: emailField.value,
        company: { name: departmentField.value }
    };
    if (userIdField.value) {
        await updateUser(userIdField.value, userData);
    }else {
        await addUser(userData);
    }
    userFormContainer.classList.add("hidden");
});
// Validate form inputs
function validateInputs() {
    if (!firstNameField.value||!lastNameField.value||!emailField.value||!departmentField.value) {
        alert("All fields are required.");
        return false;
    }
    if (!emailField.value.includes("@")) {
        alert("Please enter a valid email.");
        return false;
    }
    return true;
}
// Add new user (UI update only)
async function addUser(userData) {
    userData.id = Math.floor(Math.random() * 1000) + 1; // Generate fake ID
    appendUserToTable(userData);
    alert("User added successfully!");
    userForm.reset();
    userIdField.value = "";
}
// Append user to table
function appendUserToTable(user) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name.split(" ")[0]}</td>
        <td>${user.name.split(" ")[1] || ""}</td>
        <td>${user.email}</td>
        <td>${user.company.name}</td>
        <td>
            <button onclick="editUser(${user.id})">Edit</button>
            <button onclick="deleteUser(${user.id})">Delete</button>
        </td>
    `;
    userTableBody.appendChild(row);
}
// Edit user (Prefill form)
async function editUser(userId) {
    const response = await fetch(`${API_URL}/${userId}`);
    const user = await response.json();

    userFormContainer.classList.remove("hidden");
    formTitle.textContent = "Edit User";
    userIdField.value = userId;
    firstNameField.value = user.name.split(" ")[0];
    lastNameField.value = user.name.split(" ")[1] || "";
    emailField.value = user.email;
    departmentField.value = user.company.name;
}
// Update user in the UI
async function updateUser(userId, userData) {
    updateUserInTable(userId, userData);
    alert("User updated successfully!");
    userForm.reset();
    userIdField.value = "";
}
// Update user row in the table
function updateUserInTable(userId, userData) {
    const rows = document.querySelectorAll("#userTableBody tr");

    rows.forEach(row => {
        if (row.cells[0].textContent == userId) {
            row.cells[1].textContent = userData.name.split(" ")[0]; // First Name
            row.cells[2].textContent = userData.name.split(" ")[1] || ""; // Last Name
            row.cells[3].textContent = userData.email; // Email
            row.cells[4].textContent = userData.company.name; // Department
        }
    });
}
// Delete a user and remove from UI
async function deleteUser(userId) {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
        const response = await fetch(`${API_URL}/${userId}`, {
            method: "DELETE"
        });
        if (!response.ok) throw new Error("Failed to delete user");
        // Remove user from UI manually since JSONPlaceholder doesn't persist changes
        removeUserFromTable(userId);
        alert("User deleted successfully!");
    } catch (error) {
        alert("Error deleting user. Please try again.");
    }
}
function removeUserFromTable(userId) {
    const rows = document.querySelectorAll("#userTableBody tr");
    rows.forEach(row => {
        if (row.cells[0].textContent == userId) {
            row.remove(); // Remove the row from the table
        }
    });
}
// Load users on page load
fetchUsers();

