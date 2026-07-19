import React from "react";

const FilterBar = ({ filters, onFilterChange, taskCount }) => {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="priorityFilter">🎯 Priority</label>
        <select
          id="priorityFilter"
          value={filters.priority}
          onChange={(e) => onFilterChange("priority", e.target.value)}
        >
          <option value="All">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="statusFilter">📌 Status</label>
        <select
          id="statusFilter"
          value={filters.status}
          onChange={(e) => onFilterChange("status", e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="task-count">🗂️ {taskCount} task{taskCount !== 1 ? "s" : ""}</div>
    </div>
  );
};

export default FilterBar;
