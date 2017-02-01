import React, { PropTypes } from 'react';
import { Table,
         TableBody,
         TableHeader,
         TableHeaderColumn,
         TableRow,
         TableRowColumn } from 'material-ui/Table';
import { Link } from 'react-router';


export default function TaskTable({ urlBase, tasks }) {
  const sortedIds = Object.keys(tasks).sort();
  return (
    <Table>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn>task id</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        { sortedIds.map(id => <TaskTableRow key={id} urlBase={urlBase} task={tasks[id]} />) }
      </TableBody>
    </Table>
  );
}

TaskTable.propTypes = {
  urlBase: PropTypes.string,
  tasks: PropTypes.object.isRequired,
};

TaskTable.defaultProps = {
  urlBase: '/task/',
};


function TaskTableRow({ urlBase, task }) {
  return (
    <TableRow>
      <TableRowColumn>
        <Link to={`${urlBase}${task.taskId}`}>{ task.taskId }</Link>
      </TableRowColumn>
    </TableRow>
  );
}


TaskTableRow.propTypes = {
  urlBase: PropTypes.string,
  task: PropTypes.object.isRequired,
};
