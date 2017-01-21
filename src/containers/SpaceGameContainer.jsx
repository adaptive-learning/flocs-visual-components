import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SpaceGame from '../components/SpaceGame';
import { runProgram, resetGame, doActionMove } from '../actions/taskEnvironment';
import { getGameState } from '../selectors/gameState';
import { getTaskId } from '../selectors/taskEnvironment';


class SpaceGameWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.handleControlClicked = this.handleControlClicked.bind(this);
  }

  handleControlClicked(control) {
    switch (control) {
      case 'fly':
      case 'left':
      case 'right':
      case 'shoot':
        this.props.doActionMove(this.props.taskEnvironmentId, control); break;
      case 'run':
        this.props.runProgram(this.props.taskEnvironmentId);
        break;
      case 'reset':
        this.props.resetGame(this.props.taskEnvironmentId);
        break;
      default:
        throw new Error(`Undefined control ${control}`);
    }
  }

  render() {
    return (
      <SpaceGame
        taskId={this.props.taskId}
        gameState={this.props.gameState}
        showCommandControls={this.props.showCommandControls}
        onControlClicked={this.handleControlClicked}
      />
    );
  }

}

SpaceGameWrapper.propTypes = {
  taskEnvironmentId: PropTypes.string.isRequired,
  taskId: PropTypes.string,
  showCommandControls: PropTypes.bool,
  gameState: PropTypes.object.isRequired,
  runProgram: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
  doActionMove: PropTypes.func.isRequired,
};

function mapStateToProps(state, props) {
  const { taskEnvironmentId, showCommandControls } = props;
  const gameState = getGameState(state, taskEnvironmentId);
  const taskId = getTaskId(state, taskEnvironmentId);
  return { taskEnvironmentId, taskId, gameState, showCommandControls };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ runProgram, resetGame, doActionMove }, dispatch);
}

const SpaceGameContainer = connect(mapStateToProps, mapDispatchToProps)(SpaceGameWrapper);
SpaceGameContainer.defaultProps = {
  showCommandControls: false,
};
export default SpaceGameContainer;
