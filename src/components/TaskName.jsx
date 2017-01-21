import React, { PropTypes } from 'react';
import { toTitle } from '../utils/text';

export default function TaskName({ taskId }) {
  // TODO: localization
  return (
    <span>
      {toTitle(taskId)}
    </span>
  );
}


TaskName.propTypes = {
  taskId: PropTypes.string.isRequired,
};
