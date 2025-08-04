import { backendClient } from "../client/backendclients";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import useFetch from "../hooks/useFetch";
import NavBar from "../components/NavBar";

const DashboardPage = () => {
  const { user } = useAuth();
  const { getWithAuth, deleteWithAuth } = useFetch();
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescrption] = useState("");
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // const token = localStorage.getItem("token"); // or from your auth context
        const response = await backendClient.get("/projects", {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("treetoken")
            )}`,
          },
        });

        console.log("projects", response.data);
        setProjects(response.data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };
    fetchProjects();
  }, []);
  const handleDelete = async (projectId) => {
    await backendClient.delete(`/projects/${projectId}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("treetoken")
        )}`,
      },
    });
    setProjects((prev) => prev.filter((p) => p._id !== projectId));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await backendClient.post(
        "/projects",
        { name, description },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("treetoken")
            )}`,
          },
        }
      );

      console.log(res);

      setName("");
      setDescrption("");
      setProjects((prev) => [...prev, res.data]);
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpdate = async (projectId) => {
    try {
      const res = await backendClient.put(
        `/projects/${projectId}`,

        { name, description },

        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("treetoken")
            )}`,
          },
        }
      );

      const updatedProjects = projects.map((project) =>
        project._id === res.data._id ? res.data : project
      );

      setProjects(updatedProjects);
      
      setEditing(false);

      setName("");

      setDescrption("");
    } catch (error) {}
  };
  return (
    <div>
      <NavBar />
      <h2>Welcome, {user?.name || "User"}!</h2>
      {!editing ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Project Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            value={name}
            id="name"
          />
          <label htmlFor="description">Description</label>
          <input
            onChange={(e) => setDescrption(e.target.value)}
            type="text"
            value={description}
            id="description"
          />
          <button type="submit">Create Project</button>
        </form>
      ) : (
        // <form onSubmit={handleUpdate}>
        <form
          onSubmit={
            editing
              ? (e) => {
                  e.preventDefault();

                  handleUpdate(editingId);
                }
              : handleSubmit
          }
        >
          <label htmlFor="name">Project Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            value={name}
            id="name"
          />
          <label htmlFor="description">Description</label>
          <input
            onChange={(e) => setDescrption(e.target.value)}
            type="text"
            value={description}
            id="description"
          />
          <button type="submit">safe Project</button>
        </form>
      )}
      <h3>Your Projects</h3>
      {projects.length === 0 ? (
        <p>No projects yet. Start by creating one.</p>
      ) : (
        <ul>
          {projects.map((project) => (
            <li key={project._id}>
              <h4>{project.name}</h4>
              <p>{project.description}</p>
              <button
                onClick={() => {
                  setEditing(true);

                  setEditingId(project._id);

                  setName(project.name);

                  setDescrption(project.description);
                }}
              >
                View
              </button>
              <button
                onClick={() => handleDelete(project._id)}
                style={{ color: "red" }}
              >
                Delete
              </button> 
            
              <button>
                add task

              </button>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DashboardPage;
