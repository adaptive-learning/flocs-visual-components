import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SettingEditor from '../components/SettingEditor';
import { changeSetting, importTask, exportTask } from '../actions/taskEnvironment';
import { switchVimMode } from '../actions/taskEditor';
import { getSpaceWorldText, isSpaceWorldTextValid, getTask } from '../selectors/taskEnvironment';
import { isVimModeEnabled } from '../selectors/taskEditor';


class SettingEditorWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.handleChangeSetting = spaceWorldText => {
      this.props.changeSetting(this.props.taskEnvironmentId, { spaceWorldText });
      this.forceUpdate();
    };

    this.handleTaskIdChange = event => {
      const taskId = event.target.value;
      this.props.changeSetting(this.props.taskEnvironmentId, { taskId });
    };

    this.handleCategoryChange = event => {
      let category = event.target.value;
      if (category.length === 0) {
        category = null;
      }
      this.props.changeSetting(this.props.taskEnvironmentId, { category });
    };

    this.handleEnergyChange = event => {
      const energyString = event.target.value;
      const energyNumber = parseInt(energyString, 10);
      const energy = isNaN(energyNumber) ? null : energyNumber;
      this.props.changeSetting(this.props.taskEnvironmentId, { energy });
    };

    this.handleActionsLimitChange = event => {
      const actionsLimitString = event.target.value;
      const actionsLimitNumber = parseInt(actionsLimitString, 10);
      const actionsLimit = isNaN(actionsLimitNumber) ? null : actionsLimitNumber;
      this.props.changeSetting(this.props.taskEnvironmentId, { actionsLimit });
    };

    this.handleSwitchMode = this.props.switchVimMode.bind(this);
    this.exportTask = this.props.exportTask.bind(this, this.props.taskEnvironmentId);
    this.importTask = this.props.importTask.bind(this, this.props.taskEnvironmentId);
  }

  render() {
    return (
      <SettingEditor
        spaceWorldText={this.props.spaceWorldText}
        isValid={this.props.isValid}
        onChange={this.handleChangeSetting}
        taskId={this.props.taskId}
        onTaskIdChange={this.handleTaskIdChange}
        category={this.props.category || ''}
        onCategoryChange={this.handleCategoryChange}
        energy={this.props.energy}
        onEnergyChange={this.handleEnergyChange}
        actionsLimit={this.props.actionsLimit}
        onActionsLimitChange={this.handleActionsLimitChange}
        vimMode={this.props.vimMode}
        onSwitchMode={this.handleSwitchMode}
        onImport={this.importTask}
        onExport={this.exportTask}
      />
    );
  }
}

SettingEditorWrapper.propTypes = {
  taskEnvironmentId: PropTypes.string.isRequired,
  spaceWorldText: PropTypes.string.isRequired,
  isValid: PropTypes.bool.isRequired,
  changeSetting: PropTypes.func.isRequired,
  taskId: PropTypes.string.isRequired,
  category: PropTypes.string,
  energy: PropTypes.number,
  actionsLimit: PropTypes.number,
  vimMode: PropTypes.bool.isRequired,
  switchVimMode: PropTypes.func.isRequired,
  importTask: PropTypes.func.isRequired,
  exportTask: PropTypes.func.isRequired,
};

function mapStateToProps(state, props) {
  const { taskEnvironmentId } = props;
  const { taskId, category, setting } = getTask(state, taskEnvironmentId);
  const { energy, actionsLimit } = setting;
  const spaceWorldText = getSpaceWorldText(state, taskEnvironmentId);
  const isValid = isSpaceWorldTextValid(state, taskEnvironmentId);
  const vimMode = isVimModeEnabled(state);
  return {
    taskEnvironmentId,
    taskId,
    category,
    energy,
    actionsLimit,
    spaceWorldText,
    isValid,
    vimMode,
  };
}

const actionCreators = { changeSetting, switchVimMode, importTask, exportTask };
const SettingEditorContainer = connect(mapStateToProps, actionCreators)(SettingEditorWrapper);
export default SettingEditorContainer;
