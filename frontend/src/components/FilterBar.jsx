import React from "react";

const FilterBar = ({ filters, onFilterChange }) => {
  return (
    <div className="filter-bar">
      <div>
        <label>🎯 Priority</label>
        <select value={filters.priority} onChange={(e) => onFilterChange("priority", e.target.value)}>
          <option value="All">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div>
        <label>📌 Status</label>
        <select value={filters.status} onChange={(e) => onFilterChange("status", e.target.value)}>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
