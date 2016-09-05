import { REQUEST_POSTS, RECEIVE_POSTS, CREATE_POST } from '../actions/posts'

const initialState = {
    items: [],
    isPending: false
};

export default function posts(state = initialState, action) {
    switch (action.type) {

        case REQUEST_POSTS:
            return Object.assign({}, state, {
                isPending: true
            });

        case RECEIVE_POSTS:
            return Object.assign({}, state, {
                items: action.posts,
                isPending: false
            });

        default:
            return state;
    }
}
