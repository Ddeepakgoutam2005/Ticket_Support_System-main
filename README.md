# Ticket Support System

A comprehensive Ticket Support System built with the MERN stack (MongoDB, Express, React, Node.js). This application allows users to raise support tickets and enables admins and super-admins to manage, track, and resolve them efficiently.

## Features

*   **Role-Based Access Control**:
    *   **Super Admin**: View comprehensive dashboards, manage admins, and oversee all tickets.
    *   **Admin**: Handle tickets assigned to them, update status (Open, In Process, Resolved).
    *   **User**: Create new tickets, view ticket status, and history.
*   **Ticket Management**: Create, assign, update status, and track tickets.
*   **Dashboard**: Visual analytics for ticket status (Open, In Process, Resolved) and assignment stats.
*   **Authentication**: Secure login and signup functionality using JWT.
*   **Responsive Design**: Built with Tailwind CSS for a seamless experience across devices.
*   **Modern UI/UX**: Enhanced with smooth animations and interactive elements.

## Tech Stack

*   **Frontend**: React, Redux Toolkit (RTK Query), Tailwind CSS, Framer Motion, Vite.
*   **Backend**: Node.js, Express.js.
*   **Database**: MongoDB (Mongoose).

## Project Structure

```
Ticket-support-system/
├── backend/                # Node.js/Express Backend
│   ├── config/             # DB Configuration
│   ├── controllers/        # Route Controllers (Auth, Ticket, User)
│   ├── middleware/         # Auth & Validation Middleware
│   ├── models/             # Mongoose Models (User, Ticket, Blacklist)
│   ├── route/              # API Routes
│   └── index.js            # Server Entry Point
├── frontend/               # React Frontend (Vite)
│   ├── src/
│   │   ├── component/      # UI Components (Dashboard, TicketDetails, etc.)
│   │   ├── hooks/          # Custom Hooks (useAuth, etc.)
│   │   ├── store/          # Redux Store & API Slices
│   │   ├── util/           # Utility Functions
│   │   ├── App.jsx         # Main App Component
│   │   └── main.jsx        # Entry Point
│   └── index.html
├── package.json            # Root configuration for concurrent execution
└── README.md               # Project Documentation
```

## Database Schema

The application uses MongoDB with the following collections (models):

### 1. Users (`USER`)
Stores user authentication and profile information.
*   `name` (String): Full name of the user.
*   `email` (String): Unique email address.
*   `password` (String): Hashed password.
*   `role` (String): User role (`USER`, `ADMIN`, `SUPER_ADMIN`). Default is `USER`.
*   `timestamps`: `createdAt`, `updatedAt`.

### 2. Tickets (`Ticket`)
Stores all support ticket details.
*   `title` (String): Title of the ticket.
*   `description` (String): Detailed description of the issue.
*   `category` (String): Category of the issue.
*   `priority` (String): Priority level (e.g., Low, High).
*   `file` (String, optional): Attachment URL/path.
*   `userDetails` (ObjectId): Reference to the `USER` who created the ticket.
*   `assigneeDetails` (ObjectId): Reference to the `USER` (Admin) assigned to the ticket.
*   `status` (String): Current status (e.g., "Open", "Resolved").
*   `filterId` (String): Normalized status for filtering (e.g., "OPEN", "RESOLVED").
*   `timestamps`: `createdAt`, `updatedAt`.

### 3. Blacklist (`Blacklist`)
Used for token invalidation during logout.
*   `token` (String): The JWT token to be invalidated.
*   `expiresAt` (Date): When the token expires (automatically deleted by MongoDB TTL index).

## Getting Started (Quick Start)

Run the entire project (Frontend + Backend) with a single command.

### Prerequisites
*   **Node.js** installed.
*   **MongoDB** running locally or via Atlas.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd Ticket-support-system
    ```

2.  **Install all dependencies (Root, Frontend, Backend):**
    ```bash
    npm run install-all
    ```
    *This command will automatically install dependencies for the root, backend, and frontend folders.*

3.  **Environment Configuration:**
    *   **Backend**: Create `backend/.env`
        ```env
        PORT=8080
        DB_URL=mongodb://localhost:27017/ticket-system
        SECRET_KEY=your_super_secret_key
        FRONTEND_URL=http://localhost:5173
        ```
    *   **Frontend**: Create `frontend/.env`
        ```env
        VITE_API_BASE_URL=http://localhost:8080
        ```

4.  **Run the Project:**
    ```bash
    npm run dev
    ```
    *   **Frontend**: http://localhost:5173
    *   **Backend**: http://localhost:8080

---
