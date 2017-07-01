import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from '../routes'

const Root = ({ store }) => (
    <Provider store={store}>
      <div>
          <Router routes={routes} history={browserHistory} />
      </div>
    </Provider>
);

export default Root
