import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

const configureStore = (preloadedState) => {
  const store = createStore(
        rootReducer,
        preloadedState,
        compose(
            applyMiddleware(thunk)
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
