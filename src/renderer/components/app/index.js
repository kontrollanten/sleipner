import React from 'react';
import { Provider } from 'react-redux';
import SearchBox from '../../containers/SearchBox';

import '../../styles/base.scss';

export default ({ store }) => (
  <Provider store={store}>
    <SearchBox />
  </Provider>
);
