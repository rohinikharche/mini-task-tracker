# Mini Task / Issue Tracker

## Project Overview

This is a simple full-stack web application where users can:

* Add new tasks/issues
* View all tasks
* Update task status
* Delete tasks

The project is built using React.js, Node.js, Express.js, PostgreSQL, and Bootstrap.

---

# Technologies Used

## Frontend

* React.js
* Bootstrap
* Axios

## Backend

* Node.js
* Express.js

## Database

* PostgreSQL

---

# Features

* Create new tasks
* Display all tasks
* Change task status
* Delete tasks
* Responsive user interface

---

# Project Structure

```bash
mini-task-tracker/
│
├── backend/
│
└── frontend/
```

---

# Backend Setup

Go to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Run backend server:

```bash
npm run dev
```

Server runs on:

```bash
http://localhost:5000
```

---

# Frontend Setup

Go to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# Database Setup

Create PostgreSQL database:

```sql
CREATE DATABASE task_tracker;
```

Create table:

```sql
CREATE TABLE issues (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'Open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# Author

Developed by Rohini Kharche
