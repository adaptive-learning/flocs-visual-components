import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SettingEditor from '../components/SettingEditor';
import { changeSetting } from '../actions/taskEnvironment';
import { getSettingText, isSettingTextValid } from '../selectors/taskEnvironment';


class SettingEditorWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.changeSetting = this.props.changeSetting.bind(this, this.props.taskEnvironmentId);
  }

  render() {
    return (
      <SettingEditor
        setting={this.props.setting}
        isValid={this.props.isValid}
        onChange={this.changeSetting}
      />
    );
  }
}

SettingEditorWrapper.propTypes = {
  taskEnvironmentId: PropTypes.string.isRequired,
  setting: PropTypes.string.isRequired,
  isValid: PropTypes.bool.isRequired,
  changeSetting: PropTypes.func.isRequired,
};

function mapStateToProps(state, props) {
  const { taskEnvironmentId } = props;
  const setting = getSettingText(state, taskEnvironmentId);
  const isValid = isSettingTextValid(state, taskEnvironmentId);
  return { taskEnvironmentId, setting, isValid };
}


const SettingEditorContainer = connect(mapStateToProps, { changeSetting })(SettingEditorWrapper);
export default SettingEditorContainer;
