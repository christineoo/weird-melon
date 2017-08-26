import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import navigator from '../reducers/navigator';
import auth from '../reducers/auth';
import posts from '../reducers/posts';

const rootReducer = combineReducers({
  routing,
  navigator,
  auth,
  posts
});

export default rootReducer;
