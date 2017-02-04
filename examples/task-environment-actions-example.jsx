import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { FlocsProvider,
         TaskEnvironmentContainer,
         flocsComponentsReducer,
         flocsActionCreators,
         flocsActionTypes,
         flocsSelector,
         parseSpaceWorld } from 'flocs-visual-components';

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
    taskId: 'two-steps-forward',
    category: 'actions',
    setting: {
      fields: parseSpaceWorld(`
        |g |g |g |g |g |
        |b |b |b |b |b |
        |b |b |bS|b |b |`),
    },
  };

  const task2 = {
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
      energy: 4,
      actionsLimit: 2,
    },
  };
  const tasks = [task1, task2];
  let currentTaskIndex = 0;
  const taskEnvId = 'single';
  // simulate that the task is set only after some time
  setTimeout(() => store.dispatch(flocsActionCreators.setTask(taskEnvId, task1)), 500);

  // for our demo, we will simply loop over the two tasks
  function nextTask() {
    currentTaskIndex = (currentTaskIndex + 1) % 2;
    const task = tasks[currentTaskIndex];
    store.dispatch(flocsActionCreators.setTask(taskEnvId, task));
  }

  // presentation component for task environment with next-task button
  function PracticeEnvironment({ taskSolved }) {
    return (
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} >
        <TaskEnvironmentContainer taskEnvironmentId={taskEnvId} />
        {taskSolved &&
          <div style={{ position: 'fixed', bottom: 10, left: 10 }} >
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
      <FlocsProvider>
        <PracticeEnvironmentContainer />
      </FlocsProvider>
    </Provider>
  );
  return appComponent;
}


// you can make your reducer respond to actions dispatch by flocsComponents
function myAppReducer(state = { attempted: false }, action) {
  switch (action.type) {
    case flocsActionTypes.SET_TASK:
      console.log('myAppReducer responding to new task:', action.payload);
      return { attempted: false };
    case flocsActionTypes.TASK_ATTEMPTED:
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
