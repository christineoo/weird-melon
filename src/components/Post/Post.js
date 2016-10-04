import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/posts'
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';
import LocalStorageUtils from '../../utils/LocalStorageUtils';
import Link from '../Link';

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

    renderPost = () => {

        const { dispatch } = this.props;

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
                        <Link
                            key={`edit-btn-${post.key}`}
                            className="edit-button"
                            dispatch={dispatch}
                            route={{ path: ['edit',  post.key] }}
                            title={`Edit`}
                        >
                            Edit
                        </Link>
                    )
                }
                postEntries.push(<li className="list-group-item" key={`${post.title} - ${post.key}`}>{post.title}</li>)
                postEntries.push(<li className="list-group-item" key={`${post.body} - ${post.key}`}>
                <ReactMarkdown
                    source={post.body}
                    renderers={codeBlock}
                    skipHtml = {this.state.htmlMode === 'skip'}
                    escapeHtml = {this.state.htmlMode === 'escape'}
                />
                </li>);
                postEntries.push(<li className="list-group-item" key={`${post.postTimestamp} - ${post.key}`}>{date.toDateString()}</li>)
                postEntries.push(<li className="list-group-item" key={`${post.uid} - ${post.key}`}>{post.user_id}</li>)

                // hide horizontal line if it is the last entry
                if(index !== (this.state.posts.items.length - 1)) {
                    postEntries.push(<hr key={`hr - ${post.key}`}/>)
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
