import React, { PropTypes } from 'react';
import SplitPane from 'react-split-pane';
import TaskEnvironmentContainer from '../containers/TaskEnvironmentContainer';
import SettingEditorContainer from '../containers/SettingEditorContainer';

export default function TaskEditor({ taskEnvironmentId }) {
  return (
    <SplitPane
      split="vertical"
      primary="second"
      defaultSize={400}
      resizerStyle={{
        backgroundColor: '#ddd',
        width: 1,
        cursor: 'col-resize',
      }}
    >
      <TaskEnvironmentContainer
        taskEnvironmentId={taskEnvironmentId}
        showCommandControls={true}
      />
      <SettingEditorContainer
        taskEnvironmentId={taskEnvironmentId}
      />
    </SplitPane>
  );
}

TaskEditor.propTypes = {
  taskEnvironmentId: PropTypes.string.isRequired,
};

TaskEditor.defaultProps = {
  taskEnvironmentId: 'TASK_ENVIRONMENT_FOR_TASK_EDITOR',
};
