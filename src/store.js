import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer, history } from './services/reducers';
import { socketMiddleware } from './services/middleware';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { wsActions } from './services/actions/ws-actions';
import { wsActionsAuth } from './services/actions/ws-actions-auth';
import { WS_URL, WS_URL_AUTH } from './constants/constants';


const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;





const enhancer = composeEnhancers(
  applyMiddleware(thunk, routerMiddleware(history), socketMiddleware(WS_URL, wsActions, false), socketMiddleware(WS_URL_AUTH, wsActionsAuth, true))
);

export const store = createStore(rootReducer, enhancer);