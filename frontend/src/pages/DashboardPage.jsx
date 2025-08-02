// src/pages/DashboardPage.jsx
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { useFetch } from "../hooks/useFetch"
import NavBar from "../components/NavBar"

const DashboardPage = () => {
  const { user } = useAuth()
  const { getWithAuth, deleteWithAuth } = useFetch()
  const [projects, setProjects] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getWithAuth("/projects")
      setProjects(data)
    }
    fetchProjects()
  }, [])

  const handleDelete = async (projectId) => {
    await deleteWithAuth(`/projects/${projectId}`)
    setProjects((prev) => prev.filter((p) => p._id !== projectId))
  }

  return (
    <div>
      <NavBar />
      <h2>Welcome, {user?.name || "User"}!</h2>
      <button onClick={() => navigate("/projects/new")}>+ New Project</button>

      <h3>Your Projects</h3>
      {projects.length === 0 ? (
        <p>No projects yet. Start by creating one.</p>
      ) : (
        <ul>
          {projects.map((project) => (
            <li key={project._id}>
              <h4>{project.name}</h4>
              <p>{project.description}</p>
              <button onClick={() => navigate(`/projects/${project._id}`)}>View</button>
              <button onClick={() => handleDelete(project._id)} style={{ color: "red" }}>
                Delete
              </button>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default DashboardPage
