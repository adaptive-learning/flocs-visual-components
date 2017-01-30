import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import TaskEnvironment from '../components/TaskEnvironment';
import { createTaskEnvironment } from '../actions/taskEnvironment';
import { getEditorType } from '../selectors/taskEnvironment';


class TaskEnvironmentWrapper extends React.Component {
  componentWillMount() {
    this.props.createTaskEnvironment(this.props.taskEnvironmentId);
  }

  render() {
    return (
      <TaskEnvironment
        taskEnvironmentId={this.props.taskEnvironmentId}
        editorType={this.props.editorType}
        showCommandControls={this.props.showCommandControls}
      />
    );
  }
}

TaskEnvironmentWrapper.propTypes = {
  taskEnvironmentId: PropTypes.string.isRequired,
  createTaskEnvironment: PropTypes.func.isRequired,
  showCommandControls: PropTypes.bool.isRequired,
  editorType: PropTypes.oneOf(['code', 'blockly']).isRequired,
};


TaskEnvironmentWrapper.defaultProps = {
  showCommandControls: false,
};


function mapStateToProps(state, props) {
  return {
    taskEnvironmentId: props.taskEnvironmentId,
    editorType: getEditorType(state, props.taskEnvironmentId),
  };
}


const TaskEnvironmentContainer = connect(
  mapStateToProps,
  { createTaskEnvironment })(TaskEnvironmentWrapper);
export default TaskEnvironmentContainer;
