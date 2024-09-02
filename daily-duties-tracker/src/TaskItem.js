import React from "react";

function TaskItem({ task, toggleTaskCompletion, editTask }) {
  return (
    <li style={{ textDecoration: task.completed ? "line-through" : "none" }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTaskCompletion(task.id)}
      />
      {task.text} - <em>{task.dueDate}</em>
      <button onClick={() => editTask(task.id)}>Edit</button>
    </li>
  );
}

export default TaskItem;
