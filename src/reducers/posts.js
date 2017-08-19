import { REQUEST_POSTS, RECEIVE_POSTS, CREATE_POST, UPDATE_POST } from '../actions/posts';

const initialState = {
  items: [],
  postsByKey: [],
  isPending: false
};

export default function posts(state = initialState, action) {
  switch (action.type) {

  case REQUEST_POSTS:
    return Object.assign({}, state, {
      isPending: true
    });

  case CREATE_POST:
    return Object.assign({}, state, {
      isPending: true
    });

  case UPDATE_POST:
    return Object.assign({}, state, {
      isPending: true
    });

  case RECEIVE_POSTS:
    const postsByKey = {};
    action.posts.map((post) => {
      postsByKey[post.key] = post;
    });
    return Object.assign({}, state, {
      items: action.posts,
      postsByKey,
      isPending: false
    });

  default:
    return state;
  }
}
