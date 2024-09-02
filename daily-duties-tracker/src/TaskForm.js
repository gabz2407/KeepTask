import React, { useState } from "react";

function TaskForm({ addTask }) {
  const [taskRows, setTaskRows] = useState([{ text: "", dueDate: "" }]);

  const handleInputChange = (index, field, value) => {
    const newTaskRows = [...taskRows];
    newTaskRows[index][field] = value;
    setTaskRows(newTaskRows);
  };

  const handleAddRow = () => {
    setTaskRows([...taskRows, { text: "", dueDate: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTasks = taskRows
      .filter((row) => row.text.trim() && row.dueDate)
      .map((row) => ({
        id: Date.now() + Math.random(), // Ensures unique ID for each task
        text: row.text,
        dueDate: row.dueDate,
        completed: false,
      }));
    if (newTasks.length) {
      addTask(newTasks);
      setTaskRows([{ text: "", dueDate: "" }]); // Reset form after submission
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Due Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {taskRows.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={row.text}
                  onChange={(e) =>
                    handleInputChange(index, "text", e.target.value)
                  }
                  placeholder="Enter task"
                />
              </td>
              <td>
                <input
                  type="date"
                  value={row.dueDate}
                  onChange={(e) =>
                    handleInputChange(index, "dueDate", e.target.value)
                  }
                />
              </td>
              {index === taskRows.length - 1 && (
                <td>
                  <button type="button" onClick={handleAddRow}>
                    +
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <button type="submit">Submit Tasks</button>
    </form>
  );
}

export default TaskForm;
