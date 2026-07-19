import React, { useState, useEffect } from "react";

const emptyForm = {
  title: "",
  description: "",
  priority: "Medium",
  dueDate: "",
  status: "Pending",
};

const TaskForm = ({ onSubmit, editingTask, onCancelEdit }) => {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || "",
        description: editingTask.description || "",
        priority: editingTask.priority || "Medium",
        dueDate: editingTask.dueDate ? editingTask.dueDate.substring(0, 10) : "",
        status: editingTask.status || "Pending",
      });
      setErrors({});
    } else {
      setFormData(emptyForm);
    }
  }, [editingTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required 🖊️";
    if (!formData.priority) newErrors.priority = "Pick a priority";
    if (!formData.dueDate) newErrors.dueDate = "Due date is required 📅";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
    if (!editingTask) setFormData(emptyForm);
  };

  return (
    <div className="task-form-card">
      <h2>{editingTask ? "✏️ Edit Task" : "➕ Add Task"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            name="title"
            type="text"
            placeholder="e.g. Finish assignment"
            value={formData.title}
            onChange={handleChange}
            className={errors.title ? "input-error" : ""}
          />
          {errors.title && <span className="error-text">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Optional details..."
            value={formData.description}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <div className="form-group">
          <label>Priority</label>
          <select name="priority" value={formData.priority} onChange={handleChange}>
            <option value="Low">🟢 Low</option>
            <option value="Medium">🟡 Medium</option>
            <option value="High">🔴 High</option>
          </select>
        </div>

        <div className="form-group">
          <label>Due Date</label>
          <input
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
            className={errors.dueDate ? "input-error" : ""}
          />
          {errors.dueDate && <span className="error-text">{errors.dueDate}</span>}
        </div>

        {editingTask && (
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Pending">⏳ Pending</option>
              <option value="In Progress">🚧 In Progress</option>
              <option value="Completed">✅ Completed</option>
            </select>
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingTask ? "Save 💾" : "Add ✅"}
          </button>
          {editingTask && (
            <button type="button" className="btn btn-secondary" onClick={onCancelEdit}>
              Cancel ✖️
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
