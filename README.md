# Todo App Frontend

This is the frontend of a Todo application built with React, TypeScript, and Material-UI. It allows users to register, log in, and manage their tasks (add, edit, delete, toggle completion) with a responsive design supporting iPhone and iPad.

## Prerequisites

- **Node.js**: Version 16.x or higher
- **pnpm**: Version 8.x or higher (install globally with `npm install -g pnpm`)
- **Backend Server**: The [Todo App Backend](https://github.com/Jennie77777396/todo-backend-express-mongoDB) must be running (see backend README for setup).

## Installation

1. **Set Up Backend First**:
   - Before proceeding, clone and configure the backend repository at [https://github.com/Jennie77777396/todo-backend-express-mongoDB](https://github.com/Jennie77777396/todo-backend-express-mongoDB). Follow its README instructions to start the server.

2. **Clone the Repository**:
   ```bash
   git clone https://github.com/Jennie77777396/todo-vite.git
   cd todo-vite

3. **Install Dependencies**:
   ```bash
   pnpm install
   ```

4. **Configure Environment**:
   - The frontend uses an Axios instance (`src/utils/api.ts`) preconfigured to communicate with the backend at `http://localhost:5000`. Ensure the backend is running on this port or update `src/utils/api.ts` if the backend URL differs:
     ```ts
     const api = axios.create({
       baseURL: 'http://localhost:5000', // Adjust if needed
       headers: { 'Content-Type': 'application/json' },
     });
     ```

## Running the App

1. **Start the Development Server**:
   ```bash
   pnpm run dev
   ```
   - The app will run on `http://localhost:5173` (Vite’s default port).

2. **Open in Browser**:
   - Navigate to `http://localhost:5173` to access the app.

## Usage

1. **Home Page** (`/`):
   - A simple welcome page. Log in or register to proceed.

2. **Register** (`/register`):
   - Enter an email (e.g., `demo@gmail.com`) and password (e.g., `123456`) to create an account.
   - Redirects to `/todos` upon success.

3. **Login** (`/login`):
   - Use your registered email and password to log in.
   - Redirects to `/todos` upon success.

4. **Todo List** (`/todos`):
   - **Add Task**: Type a task (e.g., "Review code") in the input field and click "Add".
   - **Edit Task**: Click "Edit" on a task, modify it, and click "Save". Confirm in the dialog.
   - **Toggle Completion**: Check/uncheck the box next to a task. Confirm in the dialog.
   - **Delete Task**: Click "Delete" on a task and confirm in the dialog.
   - **Logout**: Click "Logout" in the navbar to return to the login page.

5. **Responsive Design**:
   - Optimized for iPhone (stacked layout) and iPad (horizontal layout). Test with browser dev tools.

## Project Structure

- `src/`
  - `components/`: Reusable UI components (`NavBar.tsx`, `TodoItem.tsx`, `TodoList.tsx`).
  - `pages/`: Route-specific pages (`Home.tsx`, `Login.tsx`, `Register.tsx`, `TodoPage.tsx`).
  - `utils/`: API utility (`api.ts`).
  - `store/`: Redux store for theme toggling (`themeSlice.ts`).

