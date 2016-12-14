import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SpaceGame from '../components/SpaceGame';
import { runProgram, resetGame, executeCommand } from '../actions/taskEnvironment';
import { getGameState } from '../selectors/gameState';


class SpaceGameContainer extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <SpaceGame
        gameState={this.props.gameState}
        showCommandControls={this.props.showCommandControls}
        onControlClicked={this.handleControlClicked.bind(this)}
      />
    );
  }

  handleControlClicked(control) {
    switch (control) {
      case 'left':
      case 'right':
      case 'ahead':
      case 'ahead+shot':
        this.props.executeCommand(this.props.taskEnvironmentId, control);
        break;
      case 'run':
        this.props.runProgram(this.props.taskEnvironmentId);
        break;
      case 'reset':
        this.props.resetGame(this.props.taskEnvironmentId);
        break;
      default:
        throw 'Undefined control ' + commandName;
    }
  }
}



function mapStateToProps(state, props) {
  const { taskEnvironmentId, showCommandControls } = props;
  const gameState = getGameState(state, taskEnvironmentId);
  return { taskEnvironmentId, gameState, showCommandControls };
};


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ runProgram, resetGame, executeCommand }, dispatch);
};


const ConnectedSpaceGameContainer = connect(mapStateToProps, mapDispatchToProps)(SpaceGameContainer);
ConnectedSpaceGameContainer.defaultProps = {
  showCommandControls: false,
};
export default ConnectedSpaceGameContainer;
