import React, { Component, PropTypes } from 'react';
import Codemirror from 'react-codemirror';

const propTypes = {
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.string
};

class Editor extends Component{
    constructor(props) {
        super(props);
    }

    onInputChange = (e) => {
        this.props.onChange(e);
    };

    render() {
        let options = {
            mode: 'markdown',
            readOnly: false,
            theme: 'material',
            lineNumbers: true
        };
        return(
            <div className="editor-pane">
                <Codemirror value={this.props.value} onChange={this.onInputChange} options={options} />
            </div>
        )
    }
}

Editor.propTypes = propTypes;
export default Editor
