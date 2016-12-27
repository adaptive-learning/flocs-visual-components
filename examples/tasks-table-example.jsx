import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { TasksTable } from 'flocs-visual-components';

const task1 = {
  taskId: 'first',
  setting: {
    fields: [[['b', []], ['b', []], ['b', []], ['b', []], ['b', []]],
              [['k', []], ['k', []], ['k', ['S']], ['k', []], ['k', []]]],
  },
};
const task2 = {
  taskId: 'second',
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
    <TasksTable
      tasks={tasks}
      urlBase="/task/"
    />
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
