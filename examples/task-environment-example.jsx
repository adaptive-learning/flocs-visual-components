import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { TaskEnvironmentContainer,
         flocsComponentsReducer,
         flocsActionCreators,
         parseSpaceWorld } from 'flocs-visual-components';


function createAppComponent() {
  // combine your app reducers with flocsComponentsReducer
  const rootReducer = combineReducers({
    myApp: myAppReducer,
    flocsComponents: flocsComponentsReducer,
  });

  // create store with thunk middleware
  const middleware = applyMiddleware(thunk);
  const store = createStore(rootReducer, middleware);

  // create your app component with task environment
  const taskEnvId = 'single';
  const appComponent = (
    <Provider store={store}>
      <TaskEnvironmentContainer taskEnvironmentId={taskEnvId} />
    </Provider>
  );

  // set a task in a task environment
  const task = {
    taskId: 'ladder',
    setting: {
      fields: parseSpaceWorld(`
        |g |gA|gM|gA|g |
        |b |bA|b |bA|b |
        |b |bA|bM|bA|b |
        |b |bA|b |bA|b |
        |b |bA|bM|bA|b |
        |b |bA|b |bA|b |
        |b |bA|bM|bA|b |
        |b |bA|b |bA|b |
        |b |bA|bS|bA|b |`),
    },
  };
  store.dispatch(flocsActionCreators.setTask(taskEnvId, task));

  return appComponent;
}

function myAppReducer(state = {}, action) {
  console.log('myApp reducer listening to action:', action);
  return state;
}

const mountElement = document.getElementById('taskEnvironmentExample');
if (mountElement !== null) {
  ReactDOM.render(createAppComponent(), mountElement);
}
