import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
//import { Redirect } from 'react-router-dom'

const ProjectDetails = (props) => {
  const { project, auth } = props;
  //if (!auth.uid) return <Redirect to='/signin' /> 

  if (project) {
    let options = {weekday: 'long', hour: 'numeric', minute: 'numeric', day: '2-digit', year: 'numeric', month: '2-digit', day: 'numeric', era: 'long'}
    return (
      <div className="container section project-details">
        <div className="card  indigo lighten-5  z-depth-0">
          <div className="card-content">
            <span className="card-title">{project.title}</span>
            <p>{project.content}</p>
          </div>
          <div className="card-action    indigo lighten-5 grey-text">
            <div>Автор {project.authorFirstName} {project.authorLastName}</div>
            <div>{project.createdAt.toDate().toLocaleDateString("ru-RU", options)}</div>
          </div>
        </div>
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
  // console.log(state);
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