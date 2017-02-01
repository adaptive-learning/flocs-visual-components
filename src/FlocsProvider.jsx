import React, { PropTypes } from 'react';
import FlocsThemeProvider from './theme/FlocsThemeProvider';


/**
 * Provides context for flocs components (theme, TODO: localization, store?)
 */
export default function FlocsProvider({ children }) {
  return (
    <FlocsThemeProvider>
      {children}
    </FlocsThemeProvider>
  );
}

FlocsProvider.propTypes = {
  children: PropTypes.node,
};

FlocsProvider.defaultProps = {
  children: null,
};
