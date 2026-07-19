import React, { useState, useEffect, useCallback } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import FilterBar from "./components/FilterBar.jsx";
import taskService from "./services/taskService.js";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({ priority: "All", status: "All" });
  const [notice, setNotice] = useState(null);

  const showNotice = (text, type = "success") => {
    setNotice({ text, type });
    setTimeout(() => setNotice(null), 3000);
  };

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await taskService.getTasks(filters);
      setTasks(res.data.data);
    } catch (err) {
      showNotice(
        "❌ Could not load tasks. Is the backend server running?",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddOrUpdate = async (formData) => {
    try {
      if (editingTask) {
        await taskService.updateTask(editingTask._id, formData);
        showNotice("✅ Task updated successfully!");
        setEditingTask(null);
      } else {
        await taskService.createTask(formData);
        showNotice("🎉 Task added successfully!");
      }
      fetchTasks();
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong";
      showNotice(`❌ ${msg}`, "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task? This cannot be undone.")) return;
    try {
      await taskService.deleteTask(id);
      showNotice("🗑️ Task deleted");
      fetchTasks();
    } catch (err) {
      showNotice("❌ Could not delete task", "error");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await taskService.updateTask(id, { status });
      showNotice("🔄 Status updated");
      fetchTasks();
    } catch (err) {
      showNotice("❌ Could not update status", "error");
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => setEditingTask(null);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📋 Task Manager</h1>
        <p className="app-subtitle">Stay on top of your daily tasks ✨</p>
      </header>

      {notice && (
        <div className={`notice notice-${notice.type}`}>{notice.text}</div>
      )}

      <div className="app-content">
        <div className="form-column">
          <TaskForm
            onSubmit={handleAddOrUpdate}
            editingTask={editingTask}
            onCancelEdit={handleCancelEdit}
          />
        </div>

        <div className="list-column">
          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            taskCount={tasks.length}
          />
          <TaskList
            tasks={tasks}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
