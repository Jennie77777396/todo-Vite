React.js & Node.js Task: 
Build a Simple Todo Application

Objective:
Create a full-stack Todo List application where users can:
	•	Add, view, update, and delete tasks.
	•	Persist tasks using a Node.js backend and a MongoDB database (or an in-memory array if the database setup isn’t required).

Task Requirements:
Frontend: React.js
	1.	Features:
	•	Create a Todo List interface.
	•	Provide the following functionalities:
	•	Add a new task.
	•	Mark a task as completed/uncompleted.
	•	Edit a task.
	•	Delete a task.
	2.	Implementation Requirements:
	•	Use React Hooks (e.g., useState, useEffect).
	•	Manage state efficiently (either using local state or context API if applicable).
	•	API calls should be made using fetch or axios.
	•	UI should be responsive and user-friendly.
	3.	UI (Optional):
	•	Basic styling with CSS or Material-UI/Bootstrap components.

Backend: Node.js with Express

	•	POST /tasks: Add a new task.
	•	GET /tasks: Retrieve all tasks.
	•	PUT /tasks/:id: Update a task by ID.
	•	DELETE /tasks/:id: Delete a task by ID.
	2.	Implementation Requirements:
	•	Use Express.js to create RESTful routes.
	•	Store tasks in an array (or MongoDB if applicable).
	•	Ensure proper error handling and status codes in API respon 1.	Features:
•	API Endpoints to perform CRUD operations: 
ses.
	•	Use CORS middleware to allow frontend-backend communication.

Task Instructions:
	1.	Project Setup:
	•	Create two folders: one for the React frontend and one for the Node.js backend.
	•	Use Create React App or Vite for the frontend.
	•	Use Express.js for the backend.
	2.	Expected Deliverables:
	•	A fully functional Todo List with both frontend and backend connected.
	•	Simple README.md explaining the project structure and steps to run the app.
	•	(Optional) Include a GitHub repository with the project.

Evaluation Criteria:
	•	Frontend:
	•	Proper use of React hooks and component structure.
	•	Clean and modular code organization.
	•	Ability to handle API calls and manage state.
	•	Backend:
	•	Proper use of Express routes and CRUD operations.
	•	Well-organized code structure.
	•	Implementation of error handling and status codes.

	•	General:
	•	Working frontend-backend integration.
	•	Clean UI and responsiveness.
	•	Proper use of Git (if applicable).

Stretch Goals (Optional Enhancements):
	1.	Backend:
	•	Use MongoDB and Mongoose for database management.
	•	Implement JWT authentication for user-specific tasks.
	2.	Frontend:
	•	Use React Router for navigation (e.g., Home and Todo pages).
	•	Use Context API or Redux for state management.


