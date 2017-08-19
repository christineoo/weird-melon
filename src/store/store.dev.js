import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import rootReducer from '../reducers';
import DevTools from '../utils/devTools';
import createLogger from 'redux-logger';
// import thunkMiddleware from 'redux-thunk'
import thunk from 'redux-thunk';

const configureStore = (preloadedState) => {
  const store = createStore(
      rootReducer,
      preloadedState,
      compose(
          applyMiddleware(thunk, createLogger()),
          DevTools.instrument()
      )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
