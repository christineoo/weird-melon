import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/posts'
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';
import LocalStorageUtils from '../../utils/LocalStorageUtils';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchPosts()).then((res) => {
          console.log('post - componentDidMount - res: ', res)
        }).catch((e) => {
          console.log('catch error: ', e)
        }) ;
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.posts !== nextProps.posts) {
            this.setState({
                posts: nextProps.posts
            });
        }
    }

    editPost = (key) => {
        this.context.router.push(`/edit/${key}`)
    }

    renderPost = () => {
        let postEntries = [];
        let codeBlock = Object.assign({}, {
                            CodeBlock: CodeBlock
                        });
        let user = JSON.parse(LocalStorageUtils.get('user'));

        if (this.state.posts.items){
            this.state.posts.items.map((post, index) => {
                let date = new Date(post.postTimestamp);
                if(user.uid == post.user_id) {
                    postEntries.push(
                        <button onClick={() => this.editPost(post.key)} key={`btn - ${index}`} style={{float: 'right'}}>Edit</button>
                    )
                }
                postEntries.push(<li className="list-group-item" key={`${post.title} - ${index}`}>{post.title}</li>)
                postEntries.push(<li className="list-group-item" key={`${post.body} - ${index}`}>
                <ReactMarkdown
                    source={post.body}
                    renderers={codeBlock}
                    skipHtml = {this.state.htmlMode === 'skip'}
                    escapeHtml = {this.state.htmlMode === 'escape'}
                />
                </li>);
                postEntries.push(<li className="list-group-item" key={`${post.postTimestamp} - ${index}`}>{date.toDateString()}</li>)
                postEntries.push(<li className="list-group-item" key={`${post.uid} - ${index}`}>{post.user_id}</li>)

                // hide horizonral line if it is the last entry
                if(index !== (this.state.posts.items.length - 1)) {
                    postEntries.push(<hr key={`hr - ${index}`}/>)
                }

            });
        }
        return postEntries;
    }

    render() {
        console.log('this.props.posts: ', this.props.posts);
        return(
            <div style={{marginTop: '80px', marginRight: '50px'}}>
                <ul style={{listStyle: 'none'}}>
                    {this.renderPost()}
                </ul>
            </div>
        )
    }
}

export default Post

function mapStateToProps(state) {
  const { posts } = state;

  return {
    posts
  };
}

Post.contextTypes = {
  router: React.PropTypes.object.isRequired
}
export default connect(mapStateToProps)(Post);
