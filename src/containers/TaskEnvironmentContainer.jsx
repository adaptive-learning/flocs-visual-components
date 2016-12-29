import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import TaskEnvironment from '../components/TaskEnvironment';
import { createTaskEnvironment } from '../actions/taskEnvironment';


class TaskEnvironmentWrapper extends React.Component {
  componentWillMount() {
    this.props.createTaskEnvironment(this.props.taskEnvironmentId);
  }

  render() {
    return (
      <TaskEnvironment taskEnvironmentId={this.props.taskEnvironmentId} />
    );
  }
}

TaskEnvironmentWrapper.propTypes = {
  taskEnvironmentId: PropTypes.string.isRequired,
  createTaskEnvironment: PropTypes.func.isRequired,
};


function mapStateToProps(state, props) {
  return { taskEnvironmentId: props.taskEnvironmentId };
}


const TaskEnvironmentContainer = connect(
  mapStateToProps,
  { createTaskEnvironment })(TaskEnvironmentWrapper);
export default TaskEnvironmentContainer;
