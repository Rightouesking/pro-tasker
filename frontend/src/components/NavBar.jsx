// src/components/NavBar.jsx
import React from "react"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"

const NavBar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <span style={{ marginRight: "20px" }}>Pro-Tasker</span>
      {user && (
        <>
          <button onClick={() => navigate("/dashboard")}>Dashboard</button>
          <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
            Logout
          </button>
        </>
      )}
    </nav>
  )
}

export default NavBar
