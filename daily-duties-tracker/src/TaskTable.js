import React, { useState, useEffect } from "react";

import "./TaskTable.css";

function TaskTable({
  tasks,
  addTask,
  toggleTaskCompletion,
  editTask,
  updateTask,
  editTaskId,
  setEditTaskId,
  deleteTask,
}) {
  const [taskRows, setTaskRows] = useState([{ text: "", dueDate: "" }]);

  useEffect(() => {
    if (editTaskId) {
      const taskToEdit = tasks.find((task) => task.id === editTaskId);
      if (taskToEdit) {
        setTaskRows([
          {
            id: editTaskId,
            text: taskToEdit.text,
            dueDate: taskToEdit.dueDate,
          },
        ]);
      }
    } else {
      setTaskRows([{ text: "", dueDate: "" }]);
    }
  }, [editTaskId, tasks]);

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
    const row = taskRows[0];
    if (row.text.trim() && row.dueDate) {
      if (editTaskId) {
        updateTask(editTaskId, row.text, row.dueDate);
      } else {
        addTask({
          id: Date.now() + Math.random(),
          text: row.text,
          dueDate: row.dueDate,
          completed: false,
        });
      }
      setTaskRows([{ text: "", dueDate: "" }]); // Reset form after submission
    }
    setEditTaskId(null);
  };

  return (
    <div className="TaskTable">
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.text}
                </td>
                <td>{task.dueDate}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                  />
                </td>
                <td>
                  <button type="button" onClick={() => editTask(task.id)}>
                    Edit
                  </button>
                  <button
                    className="delete-option"
                    type="button"
                    onClick={() => deleteTask(task.id)}
                    style={{ color: "rgb(53, 53, 51)", marginLeft: "10px" }}
                  >
                    x
                  </button>
                </td>
              </tr>
            ))}
            {taskRows.map((row, index) => (
              <tr key={`new-${index}`}>
                <td>
                  <input
                    className="task-input"
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
                    className="date-input"
                    type="date"
                    value={row.dueDate}
                    onChange={(e) =>
                      handleInputChange(index, "dueDate", e.target.value)
                    }
                  />
                </td>
                <td></td>
                <td>
                  {index === taskRows.length - 1 && !editTaskId && (
                    <button type="button" onClick={handleAddRow}>
                      +
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <button type="submit">
            {editTaskId ? "Update Task" : "Add Task"}
          </button>
        </table>
      </form>
    </div>
  );
}

export default TaskTable;
