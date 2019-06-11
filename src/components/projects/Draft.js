import React from 'react'
import {Editor, EditorState, convertFromRaw} from 'draft-js'

class Draft extends React.Component {
  
  constructor(props) {
    super(props);
    
    
    const content = window.localStorage.getItem('content');

    if (content) {
      this.state1.editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.content)));
    } else {
      this.state1.editorState = EditorState.createEmpty();
    }
  }

  state1 ={
    editorState: EditorState.createEmpty()
  }

  
  render() {

    const texto = EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.content)))
    const options = {weekday: 'long', hour: 'numeric', minute: 'numeric', day: '2-digit', year: 'numeric', month: '2-digit', era: 'long'}
  return (
    <div className="container section project-details ">
        <div className="card z-depth-0">
            <div className="card-content grey-text text-darken-4">
                <span className="card-title ">{this.props.title}</span>                   
                <div className="">
                    <div className="" >
                        <Editor                
                            editorState={texto}
                            className="materialize-textarea"
                            readOnly={true}
                        />
                    </div>
                </div>
            </div>
            <div className="card-action left-align   grey-text">
                <div>{this.props.authorFirstName}</div>
                <div>{this.props.createdAt.toDate().toLocaleDateString("ru-RU", options)}</div>
            </div>
        </div>
    </div>
    );
  }
}

export default Draft