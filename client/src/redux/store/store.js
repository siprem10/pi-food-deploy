import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducer/reducer.js';
import thunk from 'redux-thunk'; /* thunk puede ser usado para
retrasar el envío de una acción hasta que se cumpla una línea de código asíncrona. */

const composeEnhancers =
   (typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
   compose;

const store = createStore(
   rootReducer,
   composeEnhancers(applyMiddleware(thunk)),
);

export default store;
