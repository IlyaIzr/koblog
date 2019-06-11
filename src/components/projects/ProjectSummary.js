import React from 'react'
import DeleteProject from './DeleteProject.js'
import { connect } from 'react-redux'

const ProjectSummary = (props) => {
  const { auth, project } = props
  
  const toDelete = (auth.uid === project.authorId) ?   <DeleteProject project={project}/> : null
  let options = {weekday: 'long', hour: '2-digit', minute: 'numeric', day: '2-digit', year: 'numeric', month: '2-digit', era: 'short'}
  return (
    <div className="card  grey lighten-4 project-summary hoverable">
      <div className="card-content grey-text text-darken-4 ">
        
      {toDelete}
        <span className="card-title ">{project.title}</span>
        <p className="grey-text text-darken-1">{project.createdAt.toDate().toLocaleDateString("ru-RU", options)} 
        {/*project.createdAt.toDate().toLocaleString("en-US", options)*/}</p>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  //console.log(state);
  return{
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps) (ProjectSummary)
