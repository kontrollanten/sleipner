import React from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SearchBox from '../../containers/SearchBox';

import '../../styles/base.scss';

export default ({ store }) => (
  <MuiThemeProvider theme={createMuiTheme({
    typography: {
      fontFamily: 'Lato',
      fontSize: 16,
    }
  })}>
    <Provider store={store}>
      <SearchBox />
    </Provider>
  </MuiThemeProvider>
);
