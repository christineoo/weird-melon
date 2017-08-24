import React, { Component, PropTypes } from 'react';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import CodeBlock from './CodeBlock';
import Editor from './Editor';
import { updatePost, fetchPosts } from '../../actions/posts';
import Button from '../Button';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired
};

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: Object.assign({})
    };
    this.state.post.title = '';
    this.state.post.body = '';
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchPosts());
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.posts !== nextProps.posts) {
      this.setState({
        post: nextProps.posts.postsByKey[nextProps.routeParams.id]
      });
    }
  }

  onMarkdownChange = (md) => {
    const post = this.state.post;
    post.body = md;
    this.setState({
      post
    });
  };

  updateTitle = (e) => {
    const post = this.state.post;
    post.title = e.target.value;
    this.setState({
      post
    });
  };

  handleSubmit = () => {
    const post = this.state.post;
    post.postTimestamp = Date.now();
    this.setState({
      post
    });
    const { dispatch } = this.props;
    dispatch(updatePost(post.key, this.state.post)).then((res) => {
      console.log('updatePost success: ', res);
          // let newRoute = { path: ['posts'] };
          // dispatch(navigateTo(newRoute));
          //   dispatch(push('/#/posts'));
      hashHistory.push('/posts');
    }).catch((e) => {
      console.log('updatePost error: ', e);
    });
  };

  render() {
    const codeBlock = Object.assign({}, {
      CodeBlock
    });
    const post = this.state.post;

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

    if (post) {
      console.log('post: ', post);
      return (
          <div>
              <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'space-between', padding: '0 20px 15px 20px' }}>
                  <label htmlFor="post-title">
                      <span style={{ fontSize: '13px', display: 'block', color: '#adadad', fontWeight: '100' }}>Post Title</span>
                      <input type="text" placeholder="title" value={this.state.post.title} onChange={this.updateTitle} className="post-title" />

                  </label>
                  <Button onClick={this.handleSubmit}>update</Button>
              </div>
              <div style={{ height: '41px', color: '#adadad', display: 'flex', justifyContent: 'space-around', alignItems: 'center', border: '1px solid #eee' }}>
                  <h1 style={labelStyle}>Markdown</h1>
                  <h1 style={labelStyle}>Preview</h1>
              </div>
              <div>
                  <Editor value={this.state.post.body} onChange={this.onMarkdownChange} />
                  <ReactMarkdown
                    className="markdown-preview"
                    source={this.state.post.body}
                    renderers={codeBlock}
                    skipHtml={this.state.htmlMode === 'skip'}
                    escapeHtml={this.state.htmlMode === 'escape'}
                  />
              </div>
          </div>
            );
    }
    return (
        <div>loading</div>
    );
  }
}

function mapStateToProps(state) {
  const { navigator } = state;
  const { path } = navigator.route;
  const { posts } = state;

  return {
    posts, path
  };
}

Edit.propTypes = propTypes;

export default connect(mapStateToProps)(Edit);
