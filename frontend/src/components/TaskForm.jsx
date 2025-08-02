// src/components/TaskForm.jsx
import React, { useState, useEffect } from "react"

const TaskForm = ({ onSubmit, initialData = {}, onCancel }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("To Do")

  useEffect(() => {
    if (initialData._id) {
      setTitle(initialData.title)
      setDescription(initialData.description)
      setStatus(initialData.status)
    }
  }, [initialData])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ title, description, status })
    if (!initialData._id) {
      setTitle("")
      setDescription("")
      setStatus("To Do")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option>To Do</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>
      <button type="submit">{initialData._id ? "Update" : "Create"} Task</button>
      {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  )
}

export default TaskForm
