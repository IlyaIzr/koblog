import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Draft from './Draft.js'

const ProjectDetails = (props) => {
  const { project, } = props;

  

  if (project) {
  
      
    return (
      <div >
        <Draft 
          title={project.title}
          content={project.content}
          authorFirstName={project.authorFirstName}
          createdAt={project.createdAt}
        />           
      </div>
    )
  } else {
    return (
      <div className="container center">
        <p>Загружаем проект...</p>
      </div>
    )
  }
}



const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[id] : null
  return {
    project: project,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{
    collection: 'projects'
  }])
)(ProjectDetails)