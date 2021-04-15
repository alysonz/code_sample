import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { promiseMiddleware } from 'cooldux';
import personalInfo from './personal_info_state';
import { combineReducers } from 'redux';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    personalInfo
  }),
  composeEnhancer(applyMiddleware(thunkMiddleware, promiseMiddleware)),
);


export default store;
