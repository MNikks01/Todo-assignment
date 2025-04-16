# Full-Stack To-Do List Web App

This is a full-stack To-Do List web app built using the **MERN** stack (MongoDB, Express.js, React.js, Node.js). The app allows users to create, update, delete, and view tasks with functionalities such as task search, filtering by date/status, and pagination.

## Features

- **User Authentication**: Secure login and registration system with JWT-based authentication.
- **CRUD Operations**: Create, Read, Update, and Delete tasks.
- **Task Search**: Search tasks by name or description.
- **Task Filtering**: Filter tasks by date or status (completed/incomplete).
- **Pagination**: Paginate tasks to display them in smaller sets.
- **Responsive UI**: The app is responsive and works well on both desktop and mobile devices.

## Technologies Used

### Frontend

- **React.js**: JavaScript library for building user interfaces.
- **React Router**: For handling routing in the app.
- **Redux Toolkit**: For state management in the app.
- **TailwindCSS**: A utility-first CSS framework for styling the app.

### Backend

- **Node.js**: JavaScript runtime for the server-side.
- **Express.js**: Web framework for Node.js to build RESTful APIs.
- **MongoDB**: NoSQL database to store user and task data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JWT (JSON Web Tokens)**: For handling authentication and authorization.

## Installation

### Prerequisites

Make sure you have the following installed:

- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **MongoDB**: [Install MongoDB](https://www.mongodb.com/try/download/community)

### Setup Instructions

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/todo-list-app.git
   cd todo-list-app
   ```

2. **Backend Setup**:

   - Navigate to the backend folder:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the backend folder and set the necessary environment variables (e.g., MongoDB URI, JWT secret).
   - Start the server:
     ```bash
     npm start
     ```

3. **Frontend Setup**:

   - Navigate to the frontend folder:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the frontend:
     ```bash
     npm start
     ```

4. Open your browser and navigate to `http://localhost:3000` to access the app.

## Usage

- **Register**: Create a new account by providing your email and password.
- **Login**: Login with your credentials to access your tasks.
- **Manage Tasks**: Add new tasks, edit, delete, or mark tasks as completed.
- **Filter/Sort**: Use the filtering options to view tasks based on their status or due date.

## Environment Variables

The following environment variables need to be set in the `.env` file for both frontend and backend:

### Backend (.env)
