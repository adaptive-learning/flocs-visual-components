import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { TaskEnvironmentContainer,
         flocsComponentsReducer,
         flocsActionCreators,
         flocsActions,
         flocsSelector,
         parseTaskSetting } from 'flocs-visual-components';

function createAppComponent() {
  // create a combined reducer and store with needed middleware
  const rootReducer = combineReducers({
    myApp: myAppReducer,
    flocsComponents: flocsComponentsReducer,
  });
  const logger = createLogger();
  const middleware = applyMiddleware(thunk, logger);
  const store = createStore(rootReducer, middleware);

  // definiton of two example tasks
  const task1 = {
    setting: parseTaskSetting(`
      |b |b |b |b |b |
      |k |k |k |k |k |
      |k |k |kS|k |k |`),
  };
  const task2 = {
    setting: parseTaskSetting(`
      |b |bA|bM|bA|b |
      |k |kA|k |kA|k |
      |k |kA|kM|kA|k |
      |k |kA|k |kA|k |
      |k |kA|kM|kA|k |
      |k |kA|k |kA|k |
      |k |kA|kM|kA|k |
      |k |kA|k |kA|k |
      |k |kA|kS|kA|k |`),
  };
  const tasks = [task1, task2];
  let currentTaskIndex = 0;
  const taskEnvId = 'single';
  // set first task into a task environment
  store.dispatch(flocsActionCreators.setTask(taskEnvId, task1));

  // for our demo, we will simply loop over the two tasks
  function nextTask() {
    currentTaskIndex = (currentTaskIndex + 1) % 2;
    const task = tasks[currentTaskIndex];
    store.dispatch(flocsActionCreators.setTask(taskEnvId, task));
  }

  // presentation component for task environment with next-task button
  function PracticeEnvironment({ taskSolved }) {
    return (
      <div>
        <TaskEnvironmentContainer taskEnvironmentId={taskEnvId} />
        {taskSolved &&
          <div>
            <button onClick={nextTask}>Next task</button>
          </div>
        }
      </div>
    );
  }
  PracticeEnvironment.propTypes = {
    taskSolved: PropTypes.bool.isRequired,
  };

  // create redux container for your environment subscribing to store
  function mapStateToProps(state) {
    const gameState = flocsSelector.getGameState(state, taskEnvId);
    const taskSolved = gameState.stage === 'solved';
    return { taskSolved };
  }
  const PracticeEnvironmentContainer = connect(mapStateToProps)(PracticeEnvironment);

  // create your root app component
  const appComponent = (
    <Provider store={store}>
      <PracticeEnvironmentContainer />
    </Provider>
  );
  return appComponent;
}


// you can make your reducer respond to actions dispatch by flocsComponents
function myAppReducer(state = { attempted: false }, action) {
  switch (action.type) {
    case flocsActions.SET_TASK:
      console.log('myAppReducer responding to new task:', action.payload);
      return { attempted: false };
    case flocsActions.TASK_ATTEMPTED:
      console.log('myAppReducer responding to attempted task:', action.payload);
      return { attempted: true };
    default:
      return state;
  }
}


const mountElement = document.getElementById('taskEnvironmentActionsExample');
if (mountElement !== null) {
  ReactDOM.render(createAppComponent(), mountElement);
}
