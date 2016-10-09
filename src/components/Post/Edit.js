import React, { Component, PropTypes } from 'react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';
import Editor from './Editor';
import { fetchPosts } from '../../actions/posts';
import { hashHistory } from 'react-router'
import { updatePost } from '../../actions/posts';
import { connect } from 'react-redux';

class Edit extends Component {
    constructor(props){
        super(props);
        this.state = {
            post: Object.assign({})
        };
        this.state.post.title = '';
        this.state.post.body = '';
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(fetchPosts())
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.posts !== nextProps.posts) {
            this.setState({
                post: nextProps.posts.postsByKey[nextProps.routeParams.id]
            });
        }
    }

    onMarkdownChange = (md) => {
      let post = this.state.post;
      post.body = md;
        this.setState({
            post: post
        });
    };

    updateTitle = (e) => {
        let post = this.state.post;
        post.title = e.target.value;
        this.setState({
            post: post
        });
    };

    handleSubmit = () => {
        let key = this.props.path[1];
        let post = this.state.post;
        post.postTimestamp = Date.now();
        this.setState({
            post: post
        });
        const { dispatch } = this.props;
        dispatch(updatePost(key, this.state.post)).then((res) => {
          console.log('updatePost success: ', res);
          // let newRoute = { path: ['posts'] };
          // dispatch(navigateTo(newRoute));
          //   dispatch(push('/#/posts'));
            hashHistory.push('/posts');
        }).catch((e) => {
            console.log('updatePost error: ', e)
        });
    };

    render () {
        let codeBlock = Object.assign({}, {
                            CodeBlock: CodeBlock
                        });
        let post = this.state.post;

        if(post){
            console.log('post: ' , post);
            return (
                <div style={{padding: '20px'}}>
                    <div style={{marginTop: '30px'}}>
                        <h1 style={{display: 'inline'}}>Edit post page</h1>
                        <button onClick={this.handleSubmit} style={{float: 'right'}}>UPDATE</button>
                    </div>
                    <div>
                        <input type="text" placeholder="title" value={this.state.post.title} onChange={this.updateTitle} />
                    </div>
                    <div>
                        <Editor value = {this.state.post.body} onChange = {this.onMarkdownChange} />
                        <ReactMarkdown
                            className="markdown-preview"
                            source={this.state.post.body}
                            renderers={codeBlock}
                            skipHtml = {this.state.htmlMode === 'skip'}
                            escapeHtml = {this.state.htmlMode === 'escape'}
                        />
                    </div>
                </div>
            )
        }
        else{
            return (
                <div>loading</div>
            )
        }
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

export default Edit;
export default connect(mapStateToProps)(Edit);
