import React, { Component, PropTypes } from 'react';
import { fetchPosts } from '../../actions/posts';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';

class View extends Component {

    constructor(props){
        super(props);
        this.state = {
            post: Object.assign({})
        };
        this.state.post.body = "";
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

    render () {
        let codeBlock = Object.assign({}, {
            CodeBlock: CodeBlock
        });
        let date = this.state.post.postTimestamp !== undefined ? new Date(this.state.post.postTimestamp).toDateString() : '';

        const dateStyle = {
            display: 'flex', justifyContent: 'flex-end', fontSize: '11px'
        };

        return (
            <div className="post-view-container">
                <div>{this.state.post.title}</div>
                <div style={dateStyle}>{date}</div>
                <hr style={{border: '1px solid #e3e3e3'}}/>
                <ReactMarkdown
                    source={this.state.post.body}
                    renderers={codeBlock}
                    skipHtml = {this.state.htmlMode === 'skip'}
                    escapeHtml = {this.state.htmlMode === 'escape'}
                />
            </div>
        )
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

export default connect(mapStateToProps)(View);

