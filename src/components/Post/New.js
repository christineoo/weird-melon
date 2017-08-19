import React, { Component, PropTypes } from 'react';
import LocalStorageUtils from '../../utils/LocalStorageUtils';
import ReactMarkdown from 'react-markdown';
import Editor from './Editor';
import CodeBlock from './CodeBlock';
import { createPost } from '../../actions/posts';
import { navigateTo } from '../../actions/navigator';
import { hashHistory } from 'react-router';
import Button from '../Button';

import { connect } from 'react-redux';

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      postTimestamp: '',
      code: ''
    };
  }
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  handleSubmit = () => {
    const title = this.title.value;
    const user = JSON.parse(LocalStorageUtils.get('user'));

    const newPost = Object.assign({}, {
      user_id: user.uid,
      title,
      body: this.state.code,
      postTimestamp: Date.now()
    });
        // let body = this.state.code;
    if (title && this.state.code) {
      const { dispatch } = this.props;
      dispatch(createPost(newPost)).then((res) => {
        hashHistory.push('/posts');
                // let newRoute = { path: ['posts'] };
                // dispatch(navigateTo(newRoute));
        console.log('create new: ', res);
      }).catch((e) => {
        console.log('create new error: ', e);
      });
    }
    else {
      alert('title and body cannot be empty');
    }
  };

  setRef(ref, item) {
    if (item == 'title') {
      this.title = ref;
    }
    else if (item == 'body') {
      this.body = ref;
    }
    else if (item == 'markdownbody') {
      this.markdownbody = ref;
    }
  }

  onMarkdownChange = (md) => {
    this.setState({
      code: md
    });
  };

  render() {
    const codeBlock = Object.assign({}, {
      CodeBlock
    });
    const labelStyle = {
      fontSize: '11px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textTransform: 'uppercase',
      fontWeight: '300',
      margin: '0px',
      borderRight: '1px solid #eee',
      width: '100%',
      height: '100%'
    };

    return (
        <div>
            <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'space-between', padding: '0 20px 15px 20px' }}>
                <label>
                    <span style={{ fontSize: '13px', display: 'block', color: '#adadad', fontWeight: '100' }}>Post Title</span>
                    <input type="text" placeholder="New Post Title" ref={ref => this.setRef(ref, 'title')} className="post-title" />
                </label>
                <Button onClick={this.handleSubmit}>publish</Button>
            </div>
            <div style={{ height: '41px', color: '#adadad', display: 'flex', justifyContent: 'space-around', alignItems: 'center', border: '1px solid #eee' }}>
                <h1 style={labelStyle}>Markdown</h1>
                <h1 style={labelStyle}>Preview</h1>
            </div>
            <div>
                <Editor value={this.state.code} onChange={this.onMarkdownChange} />
                <ReactMarkdown
                  className="markdown-preview"
                  source={this.state.code}
                  renderers={codeBlock}
                  skipHtml={this.state.htmlMode === 'skip'}
                  escapeHtml={this.state.htmlMode === 'escape'}
                />
            </div>
        </div>
        );
  }
}

NewPost.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect()(NewPost);
