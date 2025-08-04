import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import  useFetch  from "../hooks/useFetch"
import { useAuth } from "../hooks/useAuth"
import NavBar from "../components/NavBar"
import { backendClient } from "../client/backendclients"
const ProjectDetailPage = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const { getWithAuth, postWithAuth, putWithAuth, deleteWithAuth } = useFetch()
  const [project, setProject] = useState(null)
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState({ title: "", description: "" })

  // Fetch project and tasks
  useEffect(() => {
    const fetchData = async () => {
      const projectData = await backendClient.get(`/projects/${id}`)
      const taskData = await backendClient.get(`/projects/${id}/tasks`)
      setProject(projectData)
      setTasks(taskData)
    }
    fetchData()
  }, [id])

  const handleCreateTask = async (e) => {
    e.preventDefault()
    const created = await postWithAuth(`/tasks`, {
      ...newTask,
      status: "To Do",
    })
    setTasks((prev) => [...prev, created])
    setNewTask({ title: "", description: "" })
  }

  const handleUpdateStatus = async (taskId, status) => {
    const updated = await putWithAuth(`/tasks/${taskId}`, {
      status,
    })
    setTasks((prev) => prev.map((t) => (t._id === taskId ? updated : t)))
  }

  const handleDelete = async (taskId) => {
    await deleteWithAuth(`/tasks/${taskId}`)
    setTasks((prev) => prev.filter((t) => t._id !== taskId))
  }

  return (
    <div>
      <NavBar />
      {project && (
        <div>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
        </div>
      )}

      <h3>Tasks</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <strong>{task.title}</strong> - {task.status}
            <br />
            {task.description}
            <div>
              <button onClick={() => handleUpdateStatus(task._id, "To Do")}>To Do</button>
              <button onClick={() => handleUpdateStatus(task._id, "In Progress")}>In Progress</button>
              <button onClick={() => handleUpdateStatus(task._id, "Done")}>Done</button>
              <button onClick={() => handleDelete(task._id)} style={{ color: "red" }}>
                Delete
              </button>
            </div>
            <hr />
          </li>
        ))}
      </ul>

      <h4>Add New Task</h4>
      <form onSubmit={handleCreateTask}>
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          required
        />
        <br />
        <textarea
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          required
        />
        <br />
        <button type="submit">Create Task</button>
      </form>
    </div>
  )
}

export default ProjectDetailPage
