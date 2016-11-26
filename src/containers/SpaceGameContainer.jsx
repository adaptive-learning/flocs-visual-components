import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SpaceGame from '../components/SpaceGame';
import { controlClicked } from '../actions/taskSessions';


class SpaceGameContainer extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <SpaceGame
        gameState={this.props.gameState}
        showCommandControls={false}
        onControlClicked={this.handleControlClicked.bind(this)}
      />
    );
  }

  handleControlClicked(control) {
    this.props.controlClicked(this.props.taskSessionId, control);
  }

}



function mapStateToProps(state, props) {
  const { taskSessionId } = props;
  const taskSession = state.flocsComponents.taskSessions[taskSessionId];
  const gameState = taskSession.gameState;
  return { taskSessionId, gameState };
};


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ controlClicked }, dispatch);
};


const ConnectedSpaceGameContainer = connect(mapStateToProps, mapDispatchToProps)(SpaceGameContainer);
export default ConnectedSpaceGameContainer;
