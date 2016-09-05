import Firebase from 'firebase';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const CREATE_POST = 'CREATE_POST';
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

function createNewPost() {
    return {
        type: CREATE_POST
    }
}

export function fetchPosts() {
    return dispatch => {
        dispatch(requestPosts());
        let posts = [];
        return Firebase.database().ref('posts').once('value').then((snapshot) => {
              Object.keys(snapshot.val()).forEach ((key, value) => {
                  let postsTemp = snapshot.val();
                  postsTemp[key].key = key;
                  posts.push(postsTemp[key])
              });
            dispatch(receivePosts(posts))
          });
    }
}

export function createPost(newPost) {
    return dispatch => {
        dispatch(createNewPost());
        let newPostKey = Firebase.database().ref().child('posts').push().key;
        let updates = {};
        updates[`/posts/${newPostKey}`] = newPost;

        return Firebase.database().ref().update(updates);
    }
}

export function updatePost(key, updatedPost) {
    return dispatch => {
        let updates = {};
        updates[`posts/${key}`] = updatedPost;
        return Firebase.database().ref().update(updates)
    }
}
