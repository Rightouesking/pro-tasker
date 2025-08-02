// src/components/TaskCard.jsx
import React from "react"

const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <div className="task-card">
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <button onClick={() => onEdit(task)}>Edit</button>
      <button onClick={() => onDelete(task._id)}>Delete</button>
    </div>
  )
}

export default TaskCard
