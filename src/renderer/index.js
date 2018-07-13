import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import { ipcRenderer } from 'electron';

import store from './store';
import SearchBox from './containers/SearchBox';

import './styles/base.scss';

let AppComponent;

if (module.hot) {
  AppComponent = hot(module)(SearchBox);
} else {
  AppComponent = SearchBox;
}

const targetElem = document.getElementById('root');

const observer = new MutationObserver(mutations => {
  const height = targetElem.offsetHeight;

  ipcRenderer.send('resize', height);
  console.log(height);
});

observer.observe(targetElem, {
  childList: true,
  subtree: true,
});

ReactDOM.render(
  <Provider store={store}>
    <AppComponent />
  </Provider>,
  targetElem
);
