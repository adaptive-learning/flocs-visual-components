import React, { PropTypes } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { cyan500 } from 'material-ui/styles/colors';


const flocsTheme = getMuiTheme({
  palette: {
    textColor: cyan500,
  },
});


export default function FlocsThemeProvider({ children }) {
  return (
    <MuiThemeProvider muiTheme={flocsTheme}>
      {children}
    </MuiThemeProvider>
  );
}

FlocsThemeProvider.propTypes = {
  children: PropTypes.node,
};

FlocsThemeProvider.defaultProps = {
  children: null,
};
