import React, { PropTypes } from 'react';
import SplitPane from 'react-split-pane';
import CodeEditorContainer from '../containers/CodeEditorContainer';
import BlocklyEditorContainer from '../containers/BlocklyEditorContainer';
import SpaceGameContainer from '../containers/SpaceGameContainer';


export default function TaskEnvironment({ taskEnvironmentId, editorType, showCommandControls }) {
  return (
    <SplitPane
      split="vertical"
      minSize={280}
      defaultSize={280}
      resizerStyle={{
        backgroundColor: '#ddd',
        width: 1,
        cursor: 'col-resize',
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
          left: 0,
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
    </SplitPane>
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
