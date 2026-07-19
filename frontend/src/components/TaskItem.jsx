import React from "react";

const priorityColors = {
  Low: "#4caf50",
  Medium: "#ff9800",
  High: "#e53935",
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const TaskItem = ({ task, onEdit, onDelete, onStatusChange }) => {
  const isCompleted = task.status === "Completed";

  return (
    <div className={`task-item ${isCompleted ? "completed" : ""}`}>
      <div className="task-item-top">
        <h3>{task.title}</h3>
        <span
          className="priority-tag"
          style={{ backgroundColor: priorityColors[task.priority] }}
        >
          {task.priority}
        </span>
      </div>

      {task.description && <p className="task-desc">{task.description}</p>}

      <div className="task-meta">
        <span>📅 {formatDate(task.dueDate)}</span>
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task._id, e.target.value)}
        >
          <option value="Pending">⏳ Pending</option>
          <option value="In Progress">🚧 In Progress</option>
          <option value="Completed">✅ Completed</option>
        </select>
      </div>

      <div className="task-actions">
        <button className="btn-small edit" onClick={() => onEdit(task)}>✏️ Edit</button>
        <button className="btn-small delete" onClick={() => onDelete(task._id)}>🗑️ Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;
