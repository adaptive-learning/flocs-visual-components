import React, { PropTypes } from 'react';
import TaskEnvironmentContainer from '../containers/TaskEnvironmentContainer';
import SettingEditorContainer from '../containers/SettingEditorContainer';

export default function TaskEditor({ taskEnvironmentId }) {
  return (
    <div>
      <TaskEnvironmentContainer taskEnvironmentId={taskEnvironmentId} />
      <SettingEditorContainer taskEnvironmentId={taskEnvironmentId} />
      <button>Export</button>
    </div>
  );
}

TaskEditor.propTypes = {
  taskEnvironmentId: PropTypes.string.isRequired,
};

TaskEditor.defaultProps = {
  taskEnvironmentId: 'TASK_ENVIRONMENT_FOR_TASK_EDITOR',
};
