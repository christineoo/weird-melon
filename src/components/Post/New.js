import React, { Component, PropTypes } from 'react';
import Rebase from 're-base';
import LocalStorageUtils from '../../utils/LocalStorageUtils';
import Firebase from 'firebase';

const base = Rebase.createClass('https://weird-melon.firebaseio.com/');

class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }
    componentDidMount() {
        // let user = JSON.parse(LocalStorageUtils.get('user'));
        // this.ref = base.bindToState('posts', {
        //     context: this,
        //     asArray: true,
        //     state: 'posts'
        // });
        // Firebase.database().ref('/posts').push({
        //     user_id: user.uid,
        //     title: 'Title A',
        //     body: 'post body',
        //     postTimestamp: Date.now()
        // })
        // this.setState({
        //     posts: Firebase.database().ref('/posts')
        // })
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

    componentWillUnmount() {
        // base.removeBinding(this.ref);
    }

    render() {
        console.log('this.state.posts: ', this.state.posts)
        return (
            <div style={{marginTop: '100px'}}>
                <h1>New post page</h1>
                <ul>
                    {this.state.posts.map((post, index) => (
                        <li className="list-group-item" key={index}>{post.title}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default NewPost;
