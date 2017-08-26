import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';
import { fetchPosts } from '../../actions/posts';

class View extends Component {

  constructor(props) {
    super(props);
    this.state = {
      post: Object.assign({})
    };
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

  render() {
    const codeBlock = Object.assign({}, {
      CodeBlock
    });
    const date = this.state.post && this.state.post.postTimestamp !== undefined ? new Date(this.state.post.postTimestamp).toDateString() : '';

    const dateStyle = {
      display: 'flex', justifyContent: 'flex-end', fontSize: '11px'
    };
    if (this.state.post) {
      return (
          <div className="post-view-container">
              <div>{this.state.post.title}</div>
              <div style={dateStyle}>{date}</div>
              <hr style={{ border: '1px solid #e3e3e3' }} />
              <ReactMarkdown
                source={this.state.post.body}
                renderers={codeBlock}
                skipHtml={this.state.htmlMode === 'skip'}
                escapeHtml={this.state.htmlMode === 'escape'}
              />
          </div>
          );
    }
    return (
        <div />
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

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired
};

View.propTypes = propTypes;

export default connect(mapStateToProps)(View);

