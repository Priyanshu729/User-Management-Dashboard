
This is a simple HTML form that collects user input for **Name**, **Password**, **Email**, **Department**.
It includes basic HTML validation and is integrated with the **JSONPlaceholder API** for handling user data submission.

## Features:
- Collects **Name**, **Password**, **Email**, and **Department** from the user.
- Basic **HTML5 form validation** (`required` attribute).
- Submits data to the **JSONPlaceholder API** and allows data to be retrieved or updated.

## Files:
- **index.html**: The main HTML structure with the form.
- **style.css** (optional): Contains styling for the form (if you decide to create a separate CSS file).
- **script.js**: Contains JavaScript code to interact with the API.

## API Used:
This project uses the **JSONPlaceholder API** for user data management. The API is a **fake online REST API** that provides data like user details for testing and prototyping. The endpoint used is:

- **POST** `/users`: To send user data (e.g., Name, Email, Department).
- **GET** `/users`: To retrieve the list of users and simulate retrieving data.

### Example (Fetching Users):
```javascript
const API_URL = "https://jsonplaceholder.typicode.com/users";

// Fetching data from the API
fetch(API_URL)
    .then(response => response.json())
    .then(users => {
        console.log('Users:', users);
    })
    .catch(error => {
        console.error('Error fetching users:', error);
    });
**Limitations**: Highlights that the **JSONPlaceholder** is a mock API and data does not persist across requests but i add code so that data will be added in table but not updated as api doesnot get this data .
