import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { TaskEditorContainer,
         flocsComponentsReducer } from 'flocs-visual-components';


function createAppComponent() {
  const rootReducer = combineReducers({
    flocsComponents: flocsComponentsReducer,
  });
  const logger = createLogger();
  const middleware = applyMiddleware(thunk, logger);
  const store = createStore(rootReducer, middleware);

  const appComponent = (
    <Provider store={store}>
      <TaskEditorContainer />
    </Provider>
  );
  return appComponent;
}


const mountElement = document.getElementById('taskEditorExample');
if (mountElement !== null) {
  ReactDOM.render(createAppComponent(), mountElement);
}
