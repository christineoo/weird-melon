import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import { syncHistoryWithStore } from 'react-router-redux';
import { hashHistory } from 'react-router';
import Root from './containers/Root'

import './styles/simpleGrid.css';
import './styles/styles.scss';
import './styles/font-awesome.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import md from 'codemirror/mode/markdown/markdown';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

render(
    <Root store={store} history={history} />,
    document.getElementById('AppContainer')
);
