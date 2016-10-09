import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from '../routes'

const Root = ({ store, history }) => (
    <Provider store={store}>
      <div>
          <Router history={history} routes={routes} />
      </div>
    </Provider>
);

export default Root
