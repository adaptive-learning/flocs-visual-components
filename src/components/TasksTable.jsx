import React, { PropTypes } from 'react';
import { Table,
         TableBody,
         TableHeader,
         TableHeaderColumn,
         TableRow,
         TableRowColumn } from 'material-ui/Table';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';


export default function TaskTable({ urlBase, tasks }) {
  const sortedIds = Object.keys(tasks).sort();
  return (
    <Table>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn>
            <FormattedMessage id="TASK" />
          </TableHeaderColumn>
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
        <Link to={`${urlBase}${task.taskId}`}>
          <FormattedMessage id={`TASK.${task.taskId}`} />
        </Link>
      </TableRowColumn>
    </TableRow>
  );
}


TaskTableRow.propTypes = {
  urlBase: PropTypes.string,
  task: PropTypes.object.isRequired,
};
