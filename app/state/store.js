import { applyMiddleware, createStore, compose } from 'redux';
import reducer from './rootReducer';
import thunk from 'redux-thunk';
import storage from './utils/storage';

const middlewares = [thunk];
const enhancers = [applyMiddleware(...middlewares), storage()];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function(initialState) {
  const store = createStore(reducer, initialState, composeEnhancers(...enhancers));

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer');

      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
