import React, { PropTypes } from 'react';
import SplitPane from 'react-split-pane';
import TaskEnvironmentContainer from '../containers/TaskEnvironmentContainer';
import SettingEditorContainer from '../containers/SettingEditorContainer';


export default class TaskEditor extends React.Component {
  constructor(props) {
    super(props);
    this.handleSplitChange = this.resize.bind(this);
  }

  resize() {
    if (this.taskEnvironment != null) {
      this.taskEnvironment.resize();
    }
  }

  render() {
    const { taskEnvironmentId } = this.props;
    return (
      <SplitPane
        split="vertical"
        defaultSize={800}
        maxSize={-350}
        resizerStyle={{
          backgroundColor: '#aaa',
          width: 4,
          cursor: 'col-resize',
        }}
        onChange={this.handleSplitChange}
      >
        <TaskEnvironmentContainer
          taskEnvironmentId={taskEnvironmentId}
          showCommandControls={true}
          ref={ref => { this.taskEnvironment = ref.getWrappedInstance(); }}
        />
        <SettingEditorContainer
          taskEnvironmentId={taskEnvironmentId}
        />
      </SplitPane>
    );
  }
}

TaskEditor.propTypes = {
  taskEnvironmentId: PropTypes.string.isRequired,
};

TaskEditor.defaultProps = {
  taskEnvironmentId: 'TASK_ENVIRONMENT_FOR_TASK_EDITOR',
};
