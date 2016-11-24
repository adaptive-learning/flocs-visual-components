import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SpaceGame from '../components/SpaceGame';


class SpaceGameContainer extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <SpaceGame
        gameState={this.props.gameState}
        showCommandControls={false}
        onControlClicked={this.props.handleControlClicked}
      />
    );
  }

}


function mapStateToProps(state, props) {
  const { taskSessionId } = props.params;
  return { taskSessionId };
};


function mapDispatchToProps(dispatch) {
  //return bindActionCreators(tasksActions, dispatch);
  function demo(s) {
    console.log(s);
  }
  return { handleControlClick: demo };
};


const ConnectedSpaceGameContainer = connect(mapStateToProps, mapDispatchToProps)(SpaceGameContainer);
export default ConnectedSpaceGameContainer;
