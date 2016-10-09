import React from 'react';
import { Route } from 'react-router';

import App from './components/App';
import Home from './components/Home';
import NewPost from './components/Post/New';
import ViewPost from './components/Post/View';
import EditPost from './components/Post/Edit';
import Post from './components/Post/Post';

export default <Route path="/" component={App}>
        <Route path="home" component={Home} />
        <Route path="posts" component={Post} />
        <Route path="new_post" component={NewPost} />
        <Route path="edit/:id" component={EditPost} />
        <Route path="view/:id" component={ViewPost} />
</Route>