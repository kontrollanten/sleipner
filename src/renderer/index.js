import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import { ipcRenderer } from 'electron';

import store from './store';
import App from './components/app';

let AppComponent;

if (module.hot) {
  AppComponent = hot(module)(App);
} else {
  AppComponent = App;
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
  <AppComponent store={store} />,
  targetElem
);
