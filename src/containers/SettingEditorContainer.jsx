import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SettingEditor from '../components/SettingEditor';
import { changeSetting } from '../actions/taskEnvironment';
import { switchVimMode } from '../actions/taskEditor';
import { getSettingText, isSettingTextValid, getTaskId } from '../selectors/taskEnvironment';
import { isVimModeEnabled } from '../selectors/taskEditor';


class SettingEditorWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.handleChangeSetting = settingText => {
      this.props.changeSetting(this.props.taskEnvironmentId, { settingText });
      this.forceUpdate();
    };

    this.handleTaskIdChange = event => {
      const taskId = event.target.value;
      this.props.changeSetting(this.props.taskEnvironmentId, { taskId });
    };

    this.handleSwitchMode = this.props.switchVimMode.bind(this);
  }

  render() {
    return (
      <SettingEditor
        setting={this.props.setting}
        isValid={this.props.isValid}
        onChange={this.handleChangeSetting}
        taskId={this.props.taskId}
        onTaskIdChange={this.handleTaskIdChange}
        vimMode={this.props.vimMode}
        onSwitchMode={this.handleSwitchMode}
      />
    );
  }
}

SettingEditorWrapper.propTypes = {
  taskEnvironmentId: PropTypes.string.isRequired,
  setting: PropTypes.string.isRequired,
  isValid: PropTypes.bool.isRequired,
  changeSetting: PropTypes.func.isRequired,
  taskId: PropTypes.string.isRequired,
  vimMode: PropTypes.bool.isRequired,
  switchVimMode: PropTypes.func.isRequired,
};

function mapStateToProps(state, props) {
  const { taskEnvironmentId } = props;
  const setting = getSettingText(state, taskEnvironmentId);
  const isValid = isSettingTextValid(state, taskEnvironmentId);
  const taskId = getTaskId(state, taskEnvironmentId);
  const vimMode = isVimModeEnabled(state);
  return { taskEnvironmentId, setting, isValid, taskId, vimMode };
}

const actionCreators = { changeSetting, switchVimMode };
const SettingEditorContainer = connect(mapStateToProps, actionCreators)(SettingEditorWrapper);
export default SettingEditorContainer;
