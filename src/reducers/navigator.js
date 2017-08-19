import { CHANGE_PATH } from '../actions/navigator';
const initialRoute = { path: ['posts'] };
// const initialRoute = { path: ['posts'], query: { q: 'technology' }};

const initialState = { route: initialRoute };

export default function navigator(state = initialState, action) {
  switch (action.type) {
  case CHANGE_PATH:
    return Object.assign({}, state, {
      route: action.route
    });
  default:
    return state;
  }
}
