import React, { PropTypes } from 'react';
import CodeEditorContainer from '../containers/CodeEditorContainer';
import SpaceGameContainer from '../containers/SpaceGameContainer';


export default function TaskEnvironment({ taskEnvironmentId, showCommandControls }) {
  return (
    <span style={{ display: 'inline-block', verticalAlign: 'top' }}>
      <SpaceGameContainer
        taskEnvironmentId={taskEnvironmentId}
        showCommandControls={showCommandControls}
      />
      <CodeEditorContainer
        taskEnvironmentId={taskEnvironmentId}
      />
    </span>
  );
}

TaskEnvironment.propTypes = {
  taskEnvironmentId: PropTypes.string.isRequired,
  showCommandControls: PropTypes.bool,
};


TaskEnvironment.defaultProps = {
  showCommandControls: false,
};
