import Firebase from 'firebase';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const UPDATE_POST = 'UPDATE_POST';

function requestPosts() {
  return {
    type: REQUEST_POSTS
  };
}

function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts
  };
}

function editPost() {
  return {
    type: UPDATE_POST
  };
}
function createNewPost() {
  return {
    type: CREATE_POST
  };
}

export function fetchPosts() {
  return (dispatch) => {
    dispatch(requestPosts());
    const posts = [];
    return Firebase.database().ref('posts').once('value').then((snapshot) => {
      Object.keys(snapshot.val()).forEach((key) => {
        const postsTemp = snapshot.val();
        postsTemp[key].key = key;
        posts.push(postsTemp[key]);
      });
      dispatch(receivePosts(posts));
    });
  };
}

export function createPost(newPost) {
  return (dispatch) => {
    dispatch(createNewPost());
    const newPostKey = Firebase.database().ref().child('posts').push().key;
    const newEntry = {};
    newEntry[`/posts/${newPostKey}`] = newPost;

    return Firebase.database().ref().update(newEntry);
  };
}

export function updatePost(key, updatedPost) {
  return (dispatch) => {
    dispatch(editPost());
    const updates = {};
    updates[`posts/${key}`] = updatedPost;
    return Firebase.database().ref().update(updates);
  };
}
