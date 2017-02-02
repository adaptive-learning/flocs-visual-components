import React, { PropTypes } from 'react';
import SplitPane from 'react-split-pane';
import CodeEditorContainer from '../containers/CodeEditorContainer';
import BlocklyEditorContainer from '../containers/BlocklyEditorContainer';
import SpaceGameContainer from '../containers/SpaceGameContainer';


export default function TaskEnvironment({ taskEnvironmentId,
                                          editorType,
                                          gamePanelWidth,
                                          showCommandControls,
                                          changeGamePanelWidth }) {
  return (
    <SplitPane
      split="vertical"
      minSize={200}
      maxSize={-400}
      size={gamePanelWidth}
      resizerStyle={{
        backgroundColor: '#aaa',
        width: 4,
        cursor: 'col-resize',
      }}
      onChange={changeGamePanelWidth}
    >
      <span
        style={{
          display: 'inline-block',
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: '#eee',
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
  gamePanelWidth: PropTypes.number.isRequired,
  changeGamePanelWidth: PropTypes.func,
};


TaskEnvironment.defaultProps = {
  showCommandControls: false,
  gamePanelWidth: 280,
};
