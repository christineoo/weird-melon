import { combineReducers } from 'redux';
import navigator from '../reducers/navigator';
import auth from '../reducers/auth';
import posts from '../reducers/posts';
import { routerReducer as routing } from 'react-router-redux';

const rootReducer = combineReducers({
  routing,
  navigator,
  auth,
  posts
});

export default rootReducer;
