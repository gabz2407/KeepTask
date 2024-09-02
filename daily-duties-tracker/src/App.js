import "./App.css";

import React, { useState } from "react";
import TaskTable from "./TaskTable";
import TaskFilter from "./TaskFilter";
import TaskSearch from "./TaskSearch";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const updateTask = (id, updatedText, updatedDueDate) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, text: updatedText, dueDate: updatedDueDate }
          : task
      )
    );
    setEditTaskId(null);
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (id) => {
    setEditTaskId(id);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "incomplete") return !task.completed;
      return true;
    })
    .filter((task) =>
      task.text.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)); // Sorting by due date

  return (
    <div className="App">
      <h1>Daily Duties Tracker</h1>
      <div className="task-search-form">
        <TaskSearch setSearchTerm={setSearchTerm} />
        <TaskFilter setFilter={setFilter} />
      </div>
      <TaskTable
        tasks={filteredTasks}
        addTask={addTask}
        toggleTaskCompletion={toggleTaskCompletion}
        editTask={editTask}
        updateTask={updateTask}
        editTaskId={editTaskId}
        setEditTaskId={setEditTaskId}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
