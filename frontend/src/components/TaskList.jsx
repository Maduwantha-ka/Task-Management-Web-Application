import React from "react";
import TaskItem from "./TaskItem.jsx";

const TaskList = ({ tasks, loading, onEdit, onDelete, onStatusChange }) => {
  if (loading) {
    return <div className="empty-state">⏳ Loading your tasks...</div>;
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="empty-state">
        📭 No tasks found. Add your first task to get started!
      </div>
    );
  }

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
