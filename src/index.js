import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { syncHistoryWithStore } from 'react-router-redux';
import AppContainer from './AppContainer';
import { Router, IndexRoute, Route, hashHistory } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import NewPost from './components/Post/New';
import Post from './components/Post/Post';

import './styles/simpleGrid.css';
import './styles/styles.scss';
import './styles/font-awesome.css';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <Route path="home" component={Home} />
                <Route path="posts" component={Post} />
                <Route path="new_post" component={NewPost} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('AppContainer')
);
