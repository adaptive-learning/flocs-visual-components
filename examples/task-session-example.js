import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
//import { CodeEditorContainer } from 'flocs-visual-components/containers';
//import { SpaceGameContainer } from 'flocs-visual-components/containers';
//import { taskSessionReducer } from 'flocs-visual-components/reducers';
//import Actions from 'flocs-visual-components/actions';

function myAppReducer(state={}, action) {
  console.log('myApp reducer listening to action:', action);
  return state;
}

// combine your app reducers with taskSessionReducers
const reducers = combineReducers({
  myApp: myAppReducer,
  //taskSessions: taskSessionsReducer
});
const store = createStore(reducers);


//const gameState= {
//  fields: [[["b", []], ["b", ["A"]], ["b", ["M"]], ["b", ["A"]], ["b", []]], [["k", []], ["k", ["A"]], ["k", []], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", ["M"]], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", []], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", ["M"]], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", []], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", ["M"]], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", []], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", ["S"]], ["k", ["A"]], ["k", []]]],
//  stage: 'initial'
//}
const app = (
  <Provider store={store}>
    <p>tba..</p>
    {/*<CodeEditorContainer taskSessionId="main"/>*/}
    {/*<SpaceGameContainer taskSessionId="main"/>*/}
  </Provider>
);
ReactDOM.render(app, document.getElementById('taskSessionExample'));
