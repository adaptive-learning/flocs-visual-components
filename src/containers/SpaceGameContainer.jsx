import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SpaceGame from '../components/SpaceGame';
import { runProgram, resetGame, executeCommand } from '../actions/taskSessions';
import getGameState from '../selectors/gameState';


class SpaceGameContainer extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <SpaceGame
        gameState={this.props.gameState}
        showCommandControls={true}
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
        this.props.executeCommand(this.props.taskSessionId, control);
        break;
      case 'run':
        this.props.runProgram(this.props.taskSessionId);
        break;
      case 'reset':
        this.props.resetGame(this.props.taskSessionId);
        break;
      default:
        throw 'Undefined control ' + commandName;
    }
  }
}



function mapStateToProps(state, props) {
  const { taskSessionId } = props;
  const taskSession = state.flocsComponents.taskSessions[taskSessionId];
  const gameState = getGameState(taskSession);
  return { taskSessionId, gameState };
};


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ runProgram, resetGame, executeCommand }, dispatch);
};


const ConnectedSpaceGameContainer = connect(mapStateToProps, mapDispatchToProps)(SpaceGameContainer);
export default ConnectedSpaceGameContainer;
