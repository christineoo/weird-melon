import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import DevTools from '../utils/devTools';
// import thunkMiddleware from 'redux-thunk'

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
