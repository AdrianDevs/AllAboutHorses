import { applyMiddleware, createStore, Middleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from 'domain/reducer';
import { rootSaga } from './middleware/saga';

const sagaMiddleware = createSagaMiddleware();
const middlewareStack = [sagaMiddleware];

function makeStoreEnhancer(middleware: Middleware[]) {
  const withMiddleware = applyMiddleware(...middleware);

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line
    console.log('configure store for development build');
    // eslint-disable-next-line
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(withMiddleware);
  }

  return withMiddleware;
}

export default function configureStore() {
  const storeEnhancer = makeStoreEnhancer(middlewareStack);
  const store = createStore(rootReducer, storeEnhancer);

  sagaMiddleware.run(rootSaga);

  return store;
}
