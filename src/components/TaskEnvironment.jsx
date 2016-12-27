import React, { PropTypes } from 'react';
import CodeEditorContainer from '../containers/CodeEditorContainer';
import SpaceGameContainer from '../containers/SpaceGameContainer';


export default function TaskEnvironment({ taskEnvironmentId }) {
  return (
    <div>
      <SpaceGameContainer
        taskEnvironmentId={taskEnvironmentId}
        showCommandControls={false}
      />
      <CodeEditorContainer
        taskEnvironmentId={taskEnvironmentId}
      />
    </div>
  );
}

TaskEnvironment.propTypes = {
  taskEnvironmentId: PropTypes.string.isRequired,
};
