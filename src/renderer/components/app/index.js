import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SearchBox from '../../containers/SearchBox';

import '../../styles/base.scss';

const App = ({ store }) => (
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

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;
