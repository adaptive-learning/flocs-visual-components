import React, { PropTypes } from 'react';
import CodeEditorContainer from '../containers/CodeEditorContainer';
import BlocklyEditorContainer from '../containers/BlocklyEditorContainer';
import SpaceGameContainer from '../containers/SpaceGameContainer';


export default function TaskEnvironment({ taskEnvironmentId, editorType, showCommandControls }) {
  return (
    <span
      style={{
        display: 'inline-block',
        position: 'absolute',
        verticalAlign: 'top',
        height: '100%',
        width: '100%',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          position: 'absolute',
          left: 0,
          width: '280px',
          top: 0,
          bottom: 0,
          backgroundColor: '#eee',
          borderRightStyle: 'solid',
          borderRightWidth: '1px',
          borderColor: '#777',
          boxSizing: 'border-box',
        }}
      >
        <SpaceGameContainer
          taskEnvironmentId={taskEnvironmentId}
          showCommandControls={showCommandControls}
        />
      </span>
      <span
        style={{
          display: 'inline-block',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '280px',
          right: 0,
        }}
      >
        { editorType === 'code' &&
          <CodeEditorContainer taskEnvironmentId={taskEnvironmentId} />
        }
        { editorType === 'blockly' &&
          <BlocklyEditorContainer taskEnvironmentId={taskEnvironmentId} />
        }
      </span>
    </span>
  );
}

TaskEnvironment.propTypes = {
  taskEnvironmentId: PropTypes.string.isRequired,
  editorType: PropTypes.oneOf(['code', 'blockly']).isRequired,
  showCommandControls: PropTypes.bool,
};


TaskEnvironment.defaultProps = {
  showCommandControls: false,
};
