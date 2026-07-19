# 📋 Task Manager — MERN Stack

A simple, beautiful daily task management web app built with **MongoDB, Express.js, React.js, and Node.js**.

## ✨ Features
- ➕ Add tasks with title, description, priority, and due date
- 📃 View all tasks in a clean, organized list
- ✏️ Edit and 🗑️ delete tasks
- 🔄 Update task status (Pending / In Progress / Completed)
- 🎯 Filter tasks by priority and status
- ✅ Full input validation (frontend + backend)
- 📱 Responsive, light-maroon themed UI

## 🗂️ Project Structure
```
mern-task-manager/
├── backend/          # Express + MongoDB API
│   ├── config/       # DB connection
│   ├── models/       # Mongoose schema
│   ├── controllers/  # Route logic + validation
│   ├── routes/       # API routes
│   └── server.js
└── frontend/         # React + Vite app
    └── src/
        ├── components/
        ├── services/
        └── App.jsx
```

## 🛠️ Prerequisites
- [Node.js](https://nodejs.org/) v18+
- A MongoDB database — either:
  - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free cloud database), or
  - MongoDB installed locally

## 🚀 Setup Instructions

### 1️⃣ Backend Setup
```bash
cd backend
npm install
cp .env.example .env
```
Open `.env` and set your `MONGO_URI` (Atlas connection string or `mongodb://127.0.0.1:27017/taskmanager` for local).

Run the backend:
```bash
npm run dev
```
The API will run at `http://localhost:5000`.

### 2️⃣ Frontend Setup
Open a **new terminal**:
```bash
cd frontend
npm install
cp .env.example .env
```
The default `.env` already points to `http://localhost:5000/api/tasks` — adjust if needed.

Run the frontend:
```bash
npm run dev
```
The app will run at `http://localhost:5173`.

### 3️⃣ Open the App
Visit **http://localhost:5173** in your browser 🎉

## 🔌 API Endpoints
| Method | Endpoint          | Description        |
|--------|-------------------|---------------------|
| GET    | /api/tasks        | Get all tasks (supports `?priority=` & `?status=` filters) |
| GET    | /api/tasks/:id    | Get a single task   |
| POST   | /api/tasks        | Create a new task   |
| PUT    | /api/tasks/:id    | Update a task       |
| DELETE | /api/tasks/:id    | Delete a task       |

## 👤 Author
Maduwantha

## 📄 License
For educational purposes as part of an individual assignment.
