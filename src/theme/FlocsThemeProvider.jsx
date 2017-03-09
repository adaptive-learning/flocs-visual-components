import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from './theme';


export default function FlocsThemeProvider({ children }) {
  return (
    <MuiThemeProvider muiTheme={theme}>
      <div>
        {children}
      </div>
    </MuiThemeProvider>
  );
}

FlocsThemeProvider.propTypes = {
  children: PropTypes.node,
};

FlocsThemeProvider.defaultProps = {
  children: null,
};
