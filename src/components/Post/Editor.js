import React, { Component, PropTypes } from 'react';
import Codemirror from 'react-codemirror';

const propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string
};
const debounce = require('lodash.debounce');

class Editor extends Component {

  onInputChange = (e) => {
    this.props.onChange(e);
  };

  render() {
    const options = {
      mode: 'markdown',
      readOnly: false,
      theme: 'material',
      lineNumbers: true,
      lineWrapping: true
    };
    return (
        <div className="editor-pane">
            <Codemirror
              value={this.props.value}
              onChange={debounce(this.onInputChange, 500)}
              options={options}
            />
        </div>
        );
  }
}

Editor.propTypes = propTypes;
export default Editor;
