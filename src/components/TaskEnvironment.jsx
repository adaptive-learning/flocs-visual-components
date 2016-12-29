import React, { PropTypes } from 'react';
import CodeEditorContainer from '../containers/CodeEditorContainer';
import SpaceGameContainer from '../containers/SpaceGameContainer';


export default function TaskEnvironment({ taskEnvironmentId }) {
  return (
    <span>
      <SpaceGameContainer
        taskEnvironmentId={taskEnvironmentId}
        showCommandControls={false}
      />
      <CodeEditorContainer
        taskEnvironmentId={taskEnvironmentId}
      />
    </span>
  );
}

TaskEnvironment.propTypes = {
  taskEnvironmentId: PropTypes.string.isRequired,
};
