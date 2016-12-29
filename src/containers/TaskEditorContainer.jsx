import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import TaskEditor from '../components/TaskEditor';
import { setTask } from '../actions/taskEnvironment';
import { parseSetting } from '../core/taskSetting';


class TaskEditorWrapper extends React.Component {
  componentDidMount() {
    this.props.setTask(this.props.taskEnvironmentId, this.props.initialTask);
  }

  render() {
    return (
      <TaskEditor taskEnvironmentId={this.props.taskEnvironmentId} />
    );
  }
}

TaskEditorWrapper.propTypes = {
  taskEnvironmentId: PropTypes.string.isRequired,
  initialTask: PropTypes.object.isRequired,
  setTask: PropTypes.func.isRequired,
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

const TaskEditorContainer = connect(mapStateToProps, { setTask })(TaskEditorWrapper);
export default TaskEditorContainer;
