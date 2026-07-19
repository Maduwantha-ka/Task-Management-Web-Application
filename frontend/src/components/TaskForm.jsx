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
    else if (formData.title.trim().length > 100) newErrors.title = "Keep it under 100 characters";

    if (!formData.priority) newErrors.priority = "Pick a priority";

    if (!formData.dueDate) newErrors.dueDate = "Due date is required 📅";

    if (formData.description && formData.description.length > 500)
      newErrors.description = "Keep it under 500 characters";

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
      <h2 className="task-form-title">
        {editingTask ? "✏️ Edit Task" : "➕ New Task"}
      </h2>
      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
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
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Add some details... (optional)"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className={errors.description ? "input-error" : ""}
          />
          {errors.description && <span className="error-text">{errors.description}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className={errors.priority ? "input-error" : ""}
            >
              <option value="Low">🟢 Low</option>
              <option value="Medium">🟡 Medium</option>
              <option value="High">🔴 High</option>
            </select>
            {errors.priority && <span className="error-text">{errors.priority}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
              className={errors.dueDate ? "input-error" : ""}
            />
            {errors.dueDate && <span className="error-text">{errors.dueDate}</span>}
          </div>
        </div>

        {editingTask && (
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select id="status" name="status" value={formData.status} onChange={handleChange}>
              <option value="Pending">⏳ Pending</option>
              <option value="In Progress">🚧 In Progress</option>
              <option value="Completed">✅ Completed</option>
            </select>
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingTask ? "Save Changes 💾" : "Add Task ✅"}
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
