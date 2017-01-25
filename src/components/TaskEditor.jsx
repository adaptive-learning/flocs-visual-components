import React, { PropTypes } from 'react';
import TaskEnvironmentContainer from '../containers/TaskEnvironmentContainer';
import SettingEditorContainer from '../containers/SettingEditorContainer';

export default function TaskEditor({ taskEnvironmentId, onImport, onExport }) {
  return (
    <div>
      <div>
        <TaskEnvironmentContainer
          taskEnvironmentId={taskEnvironmentId}
          showCommandControls={true}
        />
        <SettingEditorContainer
          taskEnvironmentId={taskEnvironmentId}
        />
      </div>
      <button onClick={onImport}>
        Import
      </button>
      <button onClick={onExport}>
        Export
      </button>
    </div>
  );
}

TaskEditor.propTypes = {
  taskEnvironmentId: PropTypes.string.isRequired,
  onImport: PropTypes.func,
  onExport: PropTypes.func,
};

TaskEditor.defaultProps = {
  taskEnvironmentId: 'TASK_ENVIRONMENT_FOR_TASK_EDITOR',
};
