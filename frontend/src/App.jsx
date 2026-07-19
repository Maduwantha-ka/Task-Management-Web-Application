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
  const [message, setMessage] = useState(null);

  const notify = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(null), 2500);
  };

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await taskService.getTasks(filters);
      setTasks(res.data.data);
    } catch (err) {
      notify("❌ Could not load tasks. Is the backend running?");
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
        notify("✅ Task updated!");
        setEditingTask(null);
      } else {
        await taskService.createTask(formData);
        notify("🎉 Task added!");
      }
      fetchTasks();
    } catch (err) {
      notify(`❌ ${err.response?.data?.message || "Something went wrong"}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    await taskService.deleteTask(id);
    notify("🗑️ Task deleted");
    fetchTasks();
  };

  const handleStatusChange = async (id, status) => {
    await taskService.updateTask(id, { status });
    notify("🔄 Status updated");
    fetchTasks();
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app">
      <h1>📋 Task Manager</h1>

      {message && <div className="toast">{message}</div>}

      <TaskForm
        onSubmit={handleAddOrUpdate}
        editingTask={editingTask}
        onCancelEdit={() => setEditingTask(null)}
      />

      <FilterBar
        filters={filters}
        onFilterChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))}
      />

      <TaskList
        tasks={tasks}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}

export default App;
