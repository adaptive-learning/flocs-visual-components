import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { toTitle } from '../utils/text';

export default function TaskName({ taskId }) {
  return (
    <FormattedMessage id={`task.${taskId}`} defaultMessage={toTitle(taskId)} />
  );
}


TaskName.propTypes = {
  taskId: PropTypes.string.isRequired,
};
