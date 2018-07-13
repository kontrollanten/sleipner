import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import searchBox from './containers/SearchBox/reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let initialState;

try {
  initialState = JSON.parse(window.localStorage.getItem('appState')) || {};
} catch (error) {
  initialState = {};
}

export default createStore(
  combineReducers({
    searchBox,
  }), 
  initialState,
  composeEnhancers(applyMiddleware(thunk)),
);
