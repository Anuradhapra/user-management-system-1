# User Access Management Frontend (React)

This is the frontend application for the User Access Management system, built with React.

## Features

* User Sign-up and Login
* Role-based Navigation and Views
* Admin: Create new software entries
* Employee: Submit requests for software access
* Manager: View and approve/reject pending access requests
* JWT-based Authentication

## Tech Stack

* *Frontend:* React.js
* *API Client:* Axios
* *Authentication:* jwt-decode for client-side token parsing
* *Routing:* React Router DOM

## Setup and Run

1.  **Navigate to the frontend directory:**
    bash
    cd user-access-management/frontend
    

2.  *Install dependencies:*
    bash
    npm install
    

3.  *Start the development server:*
    bash
    npm start
    

    This will typically open the application in your browser at http://localhost:3000.

## Important Notes

* This frontend expects the backend API to be running at http://localhost:5000. Ensure your backend is started before running the frontend.
* The application uses localStorage to store the JWT token.
* Basic styling is provided in src/index.css.

---