import React from "react";
import TaskItem from "./TaskItem.jsx";

const TaskList = ({ tasks, loading, onEdit, onDelete, onStatusChange }) => {
  if (loading) return <p className="empty-msg">⏳ Loading tasks...</p>;
  if (!tasks.length) return <p className="empty-msg">📭 No tasks yet. Add one above!</p>;

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
};

export default TaskList;
