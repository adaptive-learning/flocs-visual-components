import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { FlocsProvider, TasksTable } from 'flocs-visual-components';

const task1 = {
  taskId: 'one-step-forward',
  setting: {
    fields: [[['b', []], ['b', []], ['b', []], ['b', []], ['b', []]],
              [['k', []], ['k', []], ['k', ['S']], ['k', []], ['k', []]]],
  },
};
const task2 = {
  taskId: 'ladder',
  setting: {
    fields: [[['b', []], ['b', ['A']], ['b', ['M']], ['b', ['A']], ['b', []]],
            [['k', []], ['k', ['A']], ['k', []], ['k', ['A']], ['k', []]],
            [['k', []], ['k', ['A']], ['k', ['M']], ['k', ['A']], ['k', []]],
            [['k', []], ['k', ['A']], ['k', []], ['k', ['A']], ['k', []]],
            [['k', []], ['k', ['A']], ['k', ['M']], ['k', ['A']], ['k', []]],
            [['k', []], ['k', ['A']], ['k', []], ['k', ['A']], ['k', []]],
            [['k', []], ['k', ['A']], ['k', ['M']], ['k', ['A']], ['k', []]],
            [['k', []], ['k', ['A']], ['k', []], ['k', ['A']], ['k', []]],
            [['k', []], ['k', ['A']], ['k', ['S']], ['k', ['A']], ['k', []]]],
  },
};
const tasks = { first: task1, second: task2 };


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
