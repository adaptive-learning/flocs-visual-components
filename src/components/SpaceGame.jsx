import React from 'react';
import GameStatus from './GameStatus';
import SpaceWorld from './SpaceWorld';
import GameControls from './GameControls'


export default class SpaceGame extends React.Component {
  render() {
    const { gameState, showCommandControls, onControlClicked } = this.props;
    const { fields, stage } = gameState;
    const gameOver = (stage == 'solved' || stage == 'dead');
    const initialStage = (stage == 'initial');
    const controls = {
      commands: (showCommandControls) ? ((!gameOver) ? 'active' : 'passive') : 'hidden',
      run: (initialStage) ? 'active' : 'hidden',
      reset: (!initialStage) ? 'active' : 'hidden',
    };
    return (
      <div>
        <GameStatus solved={stage == 'solved'} dead={stage == 'dead'} />
        <SpaceWorld fields={fields} />
        <GameControls controls={controls} onClick={onControlClicked} />
      </div>
    )
  }
};
