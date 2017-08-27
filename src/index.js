import React from 'react';
import { render } from 'react-dom';
import configureStore from './store';


import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import md from 'codemirror/mode/markdown/markdown';
import './styles/simpleGrid.css';
import './styles/styles.scss';
import './styles/font-awesome.css';
import Root from './containers/Root';


const store = configureStore();

render(
    <Root store={store} />,
    document.getElementById('AppContainer')
);
