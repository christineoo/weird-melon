

import React, { Component, PropTypes } from 'react';
import hljs from 'highlight.js';

const propTypes = {
  literal: React.PropTypes.string,
  language: React.PropTypes.string
};

class CodeBlock extends Component {
  componentDidMount() {
    this.highlightCode();
  }

  componentDidUpdate() {
    this.highlightCode();
  }

  highlightCode() {
    hljs.highlightBlock(this.refs.code);
  }

  render() {
    return (
        <div>
            <pre>
                <code ref="code" className={this.props.language}>
                    {this.props.literal}
                </code>
            </pre>
        </div>
        );
  }
}

CodeBlock.propTypes = propTypes;
export default CodeBlock;
