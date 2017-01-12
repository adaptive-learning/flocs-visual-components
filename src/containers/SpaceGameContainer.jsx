import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SpaceGame from '../components/SpaceGame';
import { runProgram, resetGame, executeCommand } from '../actions/taskEnvironment';
import { getGameState } from '../selectors/gameState';


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
        this.props.executeCommand(this.props.taskEnvironmentId, control); break;
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
        gameState={this.props.gameState}
        showCommandControls={this.props.showCommandControls}
        onControlClicked={this.handleControlClicked}
      />
    );
  }

}

SpaceGameWrapper.propTypes = {
  taskEnvironmentId: PropTypes.string.isRequired,
  showCommandControls: PropTypes.bool,
  gameState: PropTypes.object.isRequired,
  runProgram: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
  executeCommand: PropTypes.func.isRequired,
};

function mapStateToProps(state, props) {
  const { taskEnvironmentId, showCommandControls } = props;
  const gameState = getGameState(state, taskEnvironmentId);
  return { taskEnvironmentId, gameState, showCommandControls };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ runProgram, resetGame, executeCommand }, dispatch);
}

const SpaceGameContainer = connect(mapStateToProps, mapDispatchToProps)(SpaceGameWrapper);
SpaceGameContainer.defaultProps = {
  showCommandControls: false,
};
export default SpaceGameContainer;
