import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createProject } from '../../store/actions/projectActions'

class CreateProject extends Component {
  state = {
    title: '',
    content: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    //console.log(this.state);
    if (this.state.title || this.state.content)
    this.props.createProject(this.state)    
    this.props.history.push('/');     //this is router property history, it'll push us back tu parentheses directory
  }
  render() {
    return (
      <div className="container ">
        <form className="white indigo lighten-5" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Написать</h5>
          <div className="input-field">
            <input type="text" id='title' onChange={this.handleChange} />
            <label htmlFor="title">Название</label>
          </div>
          <div className="input-field">
            <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
            <label htmlFor="content">Содержание</label>
          </div>
          <div className="input-field">
            <button className="btn mediumturquoise lighten-1 z-depth-0">Отправить</button>
          </div>
        </form>
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    createProject: (project) => dispatch(createProject(project))
  }
}

export default connect(null, mapDispatchToProps)(CreateProject)
