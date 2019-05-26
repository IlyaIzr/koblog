import React from 'react'

const ProjectSummary = ({project}) => {
  let options = {weekday: 'long', hour: '2-digit', minute: 'numeric', day: '2-digit', year: 'numeric', month: '2-digit', day: 'numeric', era: 'long'}
  return (
    <div className="card indigo lighten-5 project-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title ">{project.title}</span>
        <p>Автор: {project.authorFirstName}</p>
        <p className="grey-text">{project.createdAt.toDate().toLocaleDateString("ru-RU", options)} 
        {/*project.createdAt.toDate().toLocaleString("en-US", options)*/}</p>
      </div>
    </div>
  )
}

export default ProjectSummary
