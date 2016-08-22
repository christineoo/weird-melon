import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import  navigator from '../reducers/navigator'
import  auth from '../reducers/auth'
import  posts from '../reducers/posts'

const rootReducer = combineReducers({
    routing: routerReducer,
    navigator,
    auth,
    posts
})

export default rootReducer;
