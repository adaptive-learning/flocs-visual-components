import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SpaceGame from '../components/SpaceGame';


class SpaceGameContainer extends React.Component {
  componentDidMount() {
  }

  render() {
    console.log(this.props);
    return (
      <SpaceGame
        gameState={this.props.gameState}
        showCommandControls={false}
        onControlClicked={s => console.log(s)}
      />
    );
  }

}


function mapStateToProps(state, props) {
  const { taskSessionId } = props;
  const taskSession = state.flocsComponents.taskSessions[taskSessionId];
  const gameState = taskSession.gameState;
  return { taskSessionId, gameState };
};


function mapDispatchToProps(dispatch) {
  //return bindActionCreators(tasksActions, dispatch);
  return {};
};


const ConnectedSpaceGameContainer = connect(mapStateToProps, mapDispatchToProps)(SpaceGameContainer);
export default ConnectedSpaceGameContainer;
