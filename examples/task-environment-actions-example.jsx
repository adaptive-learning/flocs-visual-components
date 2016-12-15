import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { CodeEditorContainer, SpaceGameContainer } from 'flocs-visual-components';
import { flocsComponentsReducer, flocsActionCreators } from 'flocs-visual-components';
import { flocsActions } from 'flocs-visual-components';
import { flocsSelector } from 'flocs-visual-components';


function AppComponent() {
  // create a combined reducer and store with needed middleware
  const rootReducer = combineReducers({
    myApp: myAppReducer,
    flocsComponents: flocsComponentsReducer
  });
  const middleware = applyMiddleware(thunk);
  const store = createStore(rootReducer, middleware);

  // definiton of two example tasks
  const task1 = {
    setting: {
      fields: [[["b", []], ["b", []], ["b", []], ["b", []], ["b", []]], [["k", []], ["k", []], ["k", ["S"]], ["k", []], ["k", []]]],
    }
  };
  const task2 = {
    setting: {
      fields: [[["b", []], ["b", ["A"]], ["b", ["M"]], ["b", ["A"]], ["b", []]], [["k", []], ["k", ["A"]], ["k", []], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", ["M"]], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", []], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", ["M"]], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", []], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", ["M"]], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", []], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", ["S"]], ["k", ["A"]], ["k", []]]],
    }
  };
  const tasks = [task1, task2];
  let currentTaskIndex = 0;

  // create task environment and set first task
  const taskEnvId = "single";
  store.dispatch(flocsActionCreators.createTaskEnvironment(taskEnvId));
  store.dispatch(flocsActionCreators.setTask(taskEnvId, task1));

  // for our demo, we will simply loop over the two tasks
  function nextTask() {
    currentTaskIndex = (currentTaskIndex + 1) % 2;
    const task = tasks[currentTaskIndex];
    store.dispatch(flocsActionCreators.setTask(taskEnvId, task));
  }

  // create presentational component for your task environment
  function TaskEnvironment({ taskSolved }) {
    return (
      <div>
        <SpaceGameContainer taskEnvironmentId={taskEnvId}/>
        <CodeEditorContainer taskEnvironmentId={taskEnvId}/>
        {taskSolved &&
          <div>
            <button onClick={nextTask}>Next task</button>
          </div>
        }
      </div>
    );
  }

  // create redux container for task environment subscribing to store
  function mapStateToProps(state) {
    const gameState = flocsSelector.getGameState(state, taskEnvId);
    const taskSolved = gameState.stage == 'solved';
    return { taskSolved };
  }
  const TaskEnvironmentContainer = connect(mapStateToProps)(TaskEnvironment);

  // create your root app component
  const appComponent = (
    <Provider store={store}>
      <TaskEnvironmentContainer />
    </Provider>
  );
  return appComponent;
}


// you can make your reducer respond to actions dispatch by flocsComponents
function myAppReducer(state={attempted: false}, action) {
  switch (action.type) {
    case flocsActions.SET_TASK:
      console.log('myAppReducer responding to new task:', action.payload);
      return {attempted: false}
    case flocsActions.TASK_ATTEMPTED:
      console.log('myAppReducer responding to attempted task:', action.payload);
      return {attempted: true}
    default:
      return state;
  }
}


const mountElement = document.getElementById('taskEnvironmentActionsExample');
if (mountElement !== null) {
  ReactDOM.render(AppComponent(), mountElement);
}
