import React from 'react'
import { Link } from 'react-router-dom'

const ProjectCard = ({ project }) => {
  return (
    <div style={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '1rem' }}>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <Link to={`/projects/${project._id}`}>
        <button>View Project</button>
      </Link>
    </div>
  )
}

export default ProjectCard
