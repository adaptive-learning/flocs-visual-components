import React, { PropTypes } from 'react';
import { Link } from 'react-router';


export default function TaskTableRow({ urlBase, task }) {
  return (
    <tr>
      <td><Link to={`${urlBase}${task.taskId}`}>{ task.taskId }</Link></td>
    </tr>
  );
}


TaskTableRow.propTypes = {
  urlBase: PropTypes.string,
  task: PropTypes.object.isRequired,
};
