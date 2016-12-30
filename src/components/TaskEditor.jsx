import React, { PropTypes } from 'react';
import TaskEnvironmentContainer from '../containers/TaskEnvironmentContainer';
import SettingEditorContainer from '../containers/SettingEditorContainer';

export default function TaskEditor({ taskEnvironmentId, onExport }) {
  return (
    <div>
      <div>
        <TaskEnvironmentContainer taskEnvironmentId={taskEnvironmentId} />
        <SettingEditorContainer taskEnvironmentId={taskEnvironmentId} />
      </div>
      <button onClick={onExport}>Export</button>
    </div>
  );
}

TaskEditor.propTypes = {
  taskEnvironmentId: PropTypes.string.isRequired,
  onExport: PropTypes.func,
};

TaskEditor.defaultProps = {
  taskEnvironmentId: 'TASK_ENVIRONMENT_FOR_TASK_EDITOR',
};
