import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import TaskEditor from '../components/TaskEditor';
import { parseSetting } from '../core/taskSetting';
import { setTask, exportTask } from '../actions/taskEnvironment';


class TaskEditorWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.exportTask = this.props.exportTask.bind(this, this.props.taskEnvironmentId);
  }

  componentDidMount() {
    this.props.setTask(this.props.taskEnvironmentId, this.props.initialTask);
  }

  render() {
    return (
      <TaskEditor
        taskEnvironmentId={this.props.taskEnvironmentId}
        onExport={this.exportTask}
      />
    );
  }
}

TaskEditorWrapper.propTypes = {
  taskEnvironmentId: PropTypes.string.isRequired,
  initialTask: PropTypes.object.isRequired,
  setTask: PropTypes.func.isRequired,
  exportTask: PropTypes.func.isRequired,
};

const defaultInitialTask = {
  setting: parseSetting(`\
    |b |b |b |b |b |
    |k |k |k |k |k |
    |k |k |kS|k |k |`),
};

TaskEditorWrapper.defaultProps = {
  taskEnvironmentId: 'TASK_ENVIRONMENT_FOR_TASK_EDITOR',
  initialTask: defaultInitialTask,
};

// eslint-disable-next-line no-unused-vars
function mapStateToProps(state) {
  return {};
}

const TaskEditorContainer = connect(mapStateToProps, { setTask, exportTask })(TaskEditorWrapper);
export default TaskEditorContainer;
