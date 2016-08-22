import Firebase from 'firebase';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

function requestPosts(){
    return {
        type: REQUEST_POSTS
    }
}

function receivePosts(posts){
    return {
        type: RECEIVE_POSTS,
        posts: posts
    }
}

export function fetchPosts() {
    return dispatch => {
        dispatch(requestPosts());
        let posts = [];
        Firebase.database().ref('posts').once('value').then((snapshot) => {
            Object.keys(snapshot.val()).forEach ((key, value) => {
                let postsTemp = snapshot.val();
                posts.push(postsTemp[key])
            })
            dispatch(receivePosts(posts))
        });
    }
}
