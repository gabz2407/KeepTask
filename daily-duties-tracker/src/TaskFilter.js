import React from "react";

import "./TaskFilter.css";

function TaskFilter({ setFilter }) {
  return (
    <div className="TaskFilter">
      <button className="all" onClick={() => setFilter("all")}>
        All
      </button>
      <button onClick={() => setFilter("completed")}>Completed</button>
      <button onClick={() => setFilter("incomplete")}>Incomplete</button>
    </div>
  );
}

export default TaskFilter;
