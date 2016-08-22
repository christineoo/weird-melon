import React, { Component, PropTypes } from 'react';
import Firebase from 'firebase';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/posts'

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchPosts());
        // let posts = [];
        // let ref = Firebase.database().ref('posts').once('value').then((snapshot) => {
        //     Object.keys(snapshot.val()).forEach ((key, value) => {
        //         let postsTemp = snapshot.val();
        //         posts.push(postsTemp[key])
        //     })
        //     this.setState({
        //         posts: posts
        //     })
        // });
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.posts !== nextProps.posts) {
            this.setState({
                posts: nextProps.posts
            });
        }
    }

    renderPost = () => {
        let postEntries = [];
        if (this.state.posts.items){
            this.state.posts.items.map((post, index) => {
                postEntries.push(<li className="list-group-item" key={`${post.title} - ${index}`}>{post.title}</li>)
                postEntries.push(<li className="list-group-item" key={`${post.body} - ${index}`}>{post.body}</li>)
                postEntries.push(<li className="list-group-item" key={`${post.postTimestamp} - ${index}`}>{post.postTimestamp}</li>)
                postEntries.push(<li className="list-group-item" key={`${post.uid} - ${index}`}>{post.user_id}</li>)
            });
        }
        return postEntries;
    }

    render() {
        console.log('this.props.posts: ', this.props.posts)
        return(
            <div>
                <ul>
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


export default connect(mapStateToProps)(Post);
