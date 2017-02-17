import React, { PropTypes } from 'react';
import { Provider, intlReducer } from 'react-intl-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createPromiseMiddleware from 'redux-promise-middleware';
import createLoggerMiddleware from 'redux-logger';
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
  const promise = createPromiseMiddleware();
  const logger = createLoggerMiddleware();
  const middleware = applyMiddleware(promise, thunk, logger);
  const store = createStore(reducer, initialState, middleware);

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
