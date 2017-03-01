import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { FlocsProvider, TasksTable } from 'flocs-visual-components';

const tasks = [
  {
    taskId: 'one-step-forward',
    categoryId: 'moves',
    setting: {},
  },
  {
    taskId: 'two-steps-forward',
    categoryId: 'moves',
    setting: {},
  },
  {
    taskId: 'three-steps-forward',
    categoryId: 'moves',
    setting: {},
  },
  {
    taskId: 'turning-left',
    categoryId: 'moves',
    setting: {},
  },
  {
    taskId: 'turning-right',
    categoryId: 'moves',
    setting: {},
  },
  {
    taskId: 'turning-left-and-right',
    categoryId: 'moves',
    setting: {},
  },
  {
    taskId: 'ladder',
    categoryId: 'repeat',
    setting: {},
  },
  {
    taskId: 'zig-zag',
    categoryId: 'repeat',
    setting: {},
  },
];


function TasksTableContainer() {
  return (
    <FlocsProvider>
      <TasksTable
        tasks={tasks}
        urlBase="/task/"
      />
    </FlocsProvider>
  );
}


function TaskEnvironmentContainer({ params }) {
  return (
    <pre>
      {JSON.stringify(tasks[params.taskId])}
    </pre>
  );
}

TaskEnvironmentContainer.propTypes = {
  params: PropTypes.object.isRequired,
};


const component = (
  <Router history={browserHistory}>
    <Route path="/tasks-table-example.html" component={TasksTableContainer} />
    <Route path="/task/:taskId" component={TaskEnvironmentContainer} />
  </Router>
);

const mountElement = document.getElementById('tasksTableExample');
if (mountElement !== null) {
  ReactDOM.render(component, mountElement);
}
