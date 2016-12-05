import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { CodeEditorContainer, SpaceGameContainer } from 'flocs-visual-components';
import { flocsComponentsReducer, flocsActionCreators } from 'flocs-visual-components';


function createAppComponent() {

  // combine your app reducers with flocsComponentsReducer
  const rootReducer = combineReducers({
    myApp: myAppReducer,
    flocsComponents: flocsComponentsReducer
  });

  // create store with thunk middleware
  const middleware = applyMiddleware(thunk);
  const store = createStore(rootReducer, middleware);


  // set a task in a task environment
  const task = {
    setting: {
      fields: [[["b", []], ["b", ["A"]], ["b", ["M"]], ["b", ["A"]], ["b", []]], [["k", []], ["k", ["A"]], ["k", []], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", ["M"]], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", []], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", ["M"]], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", []], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", ["M"]], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", []], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", ["S"]], ["k", ["A"]], ["k", []]]],
    }
  };
  const taskEnvId = "single";
  store.dispatch(flocsActionCreators.setTask(taskEnvId, task));

  // create your app component giving paired components same taskEnvironemntId
  const appComponent = (
    <Provider store={store}>
      <div>
        <SpaceGameContainer taskEnvironmentId={taskEnvId}/>
        <CodeEditorContainer taskEnvironmentId={taskEnvId}/>
      </div>
    </Provider>
  );
  return appComponent;
}

function myAppReducer(state={}, action) {
  console.log('myApp reducer listening to action:', action);
  return state;
}

const mountElement = document.getElementById('taskSessionExample');
if (mountElement !== null) {
  ReactDOM.render(createAppComponent(), mountElement);
}
