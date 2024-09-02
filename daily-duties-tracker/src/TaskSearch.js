import React from "react";

import "./TaskSearch.css";

function TaskSearch({ setSearchTerm }) {
  return (
    <div className="TaskSearch">
      <input
        type="text"
        placeholder="Search tasks..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default TaskSearch;
