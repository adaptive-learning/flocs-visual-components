import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { CodeEditorContainer, SpaceGameContainer } from 'flocs-visual-components';
import { flocsComponentsReducer } from 'flocs-visual-components';


function createAppComponent() {
  // combine your app reducers with taskSessionReducers
  const rootReducer = combineReducers({
    myApp: myAppReducer,
    flocsComponents: flocsComponentsReducer
  });
  // add thunk into middleware layer
  const middleware = applyMiddleware(thunk);
  const store = createStore(rootReducer, middleware);

  //const gameState= {
  //  fields: [[["b", []], ["b", ["A"]], ["b", ["M"]], ["b", ["A"]], ["b", []]], [["k", []], ["k", ["A"]], ["k", []], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", ["M"]], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", []], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", ["M"]], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", []], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", ["M"]], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", []], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", ["S"]], ["k", ["A"]], ["k", []]]],
  //  stage: 'initial'
  //}
  const appComponent = (
    <Provider store={store}>
      <div>
        <SpaceGameContainer taskSessionId="single"/>
        <CodeEditorContainer taskSessionId="single"/>
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
