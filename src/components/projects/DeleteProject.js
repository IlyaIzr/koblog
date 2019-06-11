import React, { Component } from 'react'
import firebase from 'firebase/app'


class DeleteProject extends Component {
    handleClick(e){
        e.preventDefault()
        //console.log(e.target.id)
        firebase.firestore().collection('projects').doc(e.target.id).delete().then(() => {
            console.log("Document successfully deleted!")
          })
    }

    render(){
        //console.log(this.props.project.id);
        
        return(<button type="button" className="btn btn-small right red lighten-1 waves-effect hoverable" data-toggle="tooltip"
        data-placement="top" title="Удалить раз и навсегда" aria-label="Close" id="deleteButton" >
                 <span aria-hidden="true" onClick={this.handleClick} id={this.props.project.id}>&times;</span>
               </button>
        )
    }    
}

export default DeleteProject