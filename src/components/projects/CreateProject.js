import React from 'react'
import { connect } from 'react-redux'
import { createProject } from '../../store/actions/projectActions'
import {Editor, EditorState, RichUtils, getDefaultKeyBinding, convertToRaw, convertFromRaw} from 'draft-js'


class CreateProject extends React.Component {
  constructor(props) {
    super(props)
    this.focus = () => this.refs.editor.focus()
    this.onChange = (editorState) => {
      const contentState = editorState.getCurrentContent()
      this.saveContent(contentState);
      this.state1.editorState = editorState;
    }
    this.handleKeyCommand = this._handleKeyCommand.bind(this)
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this)
    this.toggleBlockType = this._toggleBlockType.bind(this)
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this)
    
    const content = window.localStorage.getItem('content')

    if (content) {
      this.state1.editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
    } else {
      this.state1.editorState = EditorState.createEmpty()
    }

  }
  state = {
    title: '',
    content: ''
  }

  state1 ={
    editorState: EditorState.createEmpty()
  }

  saveContent = (content) => {
    console.log(content);
    
    window.localStorage.setItem('content', JSON.stringify(convertToRaw(content)));
    this.setState({content: JSON.stringify(convertToRaw(content))})
    console.log(this.state);
    
  }
  
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    //console.log(this.state);
    if (this.state.title || this.state.content){
    this.props.createProject(this.state)
    window.localStorage.removeItem("content")
        
    this.props.history.push('/');      //this is router property history, it'll push us back tu parentheses directory
  }
}

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }
  _mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state1.editorState,
        4, /* maxDepth */
      );
      if (newEditorState !== this.state1.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e)
  }
  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state1.editorState,
        blockType
      )
    );
  }
  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state1.editorState,
        inlineStyle
      )
    );
  }
  render() {
    const {editorState} = this.state1;
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent()
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder'
      }
    }
    return (
      <div className="container ">
        <form className="white " onSubmit={this.handleSubmit}>
          <div className="input-field">
              <input type="text" id='title' onChange={this.handleChange} />
              <label htmlFor="title">Название</label>            
          </div>
          <div className="input-field">            
              <div className="RichEditor-root">
                <InlineStyleControls
                  editorState={editorState}
                  onToggle={this.toggleInlineStyle}
                />
                <div className={className} onClick={this.focus}>
                  <Editor                
                    editorState={editorState}
                    handleKeyCommand={this.handleKeyCommand}
                    keyBindingFn={this.mapKeyToEditorCommand}
                    onChange={this.onChange}
                    ref="editor"
                    spellCheck={true}
                    className="materialize-textarea"
                    id="content"
                  />
                </div>
              </div>
              <div className="input-field">
            <button className="btn right orange accent-3 z-depth-0 waves-effect waves-light">Отправить</button>
          </div>
          </div>
        </form>
      </div>
    );
  }
}

class StyleButton extends React.Component {
  constructor() {
    super()
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style)
    };
  }
  render() {
    let className = 'RichEditor-styleButton'
    if (this.props.active) {
      className += ' RichEditor-activeButton'
    }
    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    )
  }
}

var INLINE_STYLES = [
  {label: 'Bold ', style: 'BOLD'},
  {label: 'Italic ', style: 'ITALIC'},
  {label: 'Underline ', style: 'UNDERLINE'},
  {label: 'Monospace ', style: 'CODE'},
];
const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle()
  
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    createProject: (project) => dispatch(createProject(project))
  }
}

export default connect(null, mapDispatchToProps)(CreateProject)
