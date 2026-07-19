import React from "react";

const priorityStyles = {
  Low: { bg: "#e6f4ea", color: "#2e7d32", icon: "🟢" },
  Medium: { bg: "#fff6e0", color: "#a86b00", icon: "🟡" },
  High: { bg: "#fbe3e6", color: "#a12030", icon: "🔴" },
};

const statusIcons = {
  Pending: "⏳",
  "In Progress": "🚧",
  Completed: "✅",
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
};

const TaskItem = ({ task, onEdit, onDelete, onStatusChange }) => {
  const pStyle = priorityStyles[task.priority] || priorityStyles.Medium;
  const isCompleted = task.status === "Completed";

  return (
    <div className={`task-item ${isCompleted ? "task-completed" : ""}`}>
      <div className="task-item-header">
        <h3 className="task-item-title">{task.title}</h3>
        <span className="priority-badge" style={{ background: pStyle.bg, color: pStyle.color }}>
          {pStyle.icon} {task.priority}
        </span>
      </div>

      {task.description && <p className="task-item-desc">{task.description}</p>}

      <div className="task-item-meta">
        <span className="task-due">📅 {formatDate(task.dueDate)}</span>
        <select
          className="status-select"
          value={task.status}
          onChange={(e) => onStatusChange(task._id, e.target.value)}
        >
          <option value="Pending">⏳ Pending</option>
          <option value="In Progress">🚧 In Progress</option>
          <option value="Completed">✅ Completed</option>
        </select>
      </div>

      <div className="task-item-actions">
        <button className="icon-btn edit-btn" onClick={() => onEdit(task)}>
          ✏️ Edit
        </button>
        <button className="icon-btn delete-btn" onClick={() => onDelete(task._id)}>
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
