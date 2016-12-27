import React, { PropTypes } from 'react';
import TaskTableRow from './TaskTableRow';


export default function TaskTable({ urlBase, tasks }) {
  const sortedIds = Object.keys(tasks).sort();
  return (
    <table>
      <tbody>
        { sortedIds.map(id => <TaskTableRow key={id} urlBase={urlBase} task={tasks[id]} />) }
      </tbody>
    </table>
  );
}

TaskTable.propTypes = {
  urlBase: PropTypes.string,
  tasks: PropTypes.object.isRequired,
};

TaskTable.defaultProps = {
  urlBase: '/task/',
};
