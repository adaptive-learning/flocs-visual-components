import React, { PropTypes } from 'react';
import { Provider, intlReducer } from 'react-intl-redux';
import { createStore, combineReducers } from 'redux';
import { getLocalizationSetting } from './localization';
import FlocsThemeProvider from './theme/FlocsThemeProvider';
import { flocsComponentsReducer } from './reducers';


/**
 * Provides context for flocs components (store, localization, theme)
 */
export default function FlocsProvider({ children, reducers }) {
  const initialState = {
    intl: getLocalizationSetting(),
  };
  const reducer = combineReducers({
    ...reducers,
    flocsComponents: flocsComponentsReducer,
    intl: intlReducer,
  });

  const store = createStore(reducer, initialState);

  return (
    <Provider store={store}>
      <FlocsThemeProvider>
        {children}
      </FlocsThemeProvider>
    </Provider>
  );
}

FlocsProvider.propTypes = {
  children: PropTypes.node,
  reducers: PropTypes.object,
};

FlocsProvider.defaultProps = {
  children: null,
  reducers: {},
};
