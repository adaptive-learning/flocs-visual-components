import React, { PropTypes } from 'react';
import GameStatus from './GameStatus';
import SpaceWorld from './SpaceWorld';
import GameControls from './GameControls';


export default function SpaceGame({ gameState, showCommandControls, onControlClicked }) {
  const { fields, stage } = gameState;
  const gameOver = (stage === 'solved' || stage === 'dead');
  const initialStage = (stage === 'initial');
  const preparing = (stage === 'preparing');
  const controls = {
    commands: getVisibility((!showCommandControls) || preparing, gameOver),
    run: (initialStage) ? 'active' : 'hidden',
    reset: (!initialStage && !preparing) ? 'active' : 'hidden',
  };
  return (
    <span style={{ display: 'inline-block', verticalAlign: 'top' }}>
      <GameStatus solved={stage === 'solved'} dead={stage === 'dead'} />
      <SpaceWorld fields={fields} />
      <GameControls controls={controls} onClick={onControlClicked} />
    </span>
  );
}

SpaceGame.propTypes = {
  gameState: PropTypes.object.isRequired,
  onControlClicked: PropTypes.func.isRequired,
  showCommandControls: PropTypes.bool,
};

SpaceGame.defaultProps = {
  showCommandControls: false,
};


function getVisibility(hiddenCondition, passiveCondition) {
  if (hiddenCondition) {
    return 'hidden';
  }
  if (passiveCondition) {
    return 'passive';
  }
  return 'active';
}

