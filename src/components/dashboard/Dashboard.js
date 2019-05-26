import React, { Component } from 'react'
import ProjectList from '../projects/ProjectList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
//import { Redirect } from 'react-router-dom'

class Dashboard extends Component {
  render() {

    const { projects, auth } = this.props;
    //if (!auth.uid) return <div className="container">Text field TBD</div>     simple conditional render
    //if (!auth.uid) return <Redirect to='/signin' /> 
    //this is redirect from board 4 every unlogged user

    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <ProjectList projects={projects} />
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth
  }
}
export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'projects' }    //we chose to only watch for projects props
  ])
)(Dashboard)