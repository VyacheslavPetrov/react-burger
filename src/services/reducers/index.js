import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { authReducer } from './auth';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  auth: authReducer,
  router: connectRouter(history),
});