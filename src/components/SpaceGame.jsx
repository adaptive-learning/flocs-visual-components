import React, { PropTypes } from 'react';
import GameStatus from './GameStatus';
import SpaceWorld from './SpaceWorld';
import GameControls from './GameControls';


export default function SpaceGame({
    taskId,
    gameState,
    actionsLimit,
    width,
    showCommandControls,
    onControlClicked,
  }) {
  const { fields, stage, diamonds, energy } = gameState;
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
      <GameStatus
        taskId={taskId}
        diamonds={diamonds}
        energy={energy}
        actions={actionsLimit}
        solved={stage === 'solved'}
        dead={stage === 'dead'}
      />
      <SpaceWorld
        fields={fields}
        width={width}
      />
      <GameControls controls={controls} onClick={onControlClicked} />
    </span>
  );
}

SpaceGame.propTypes = {
  taskId: PropTypes.string,
  gameState: PropTypes.object.isRequired,
  actionsLimit: PropTypes.object,
  onControlClicked: PropTypes.func.isRequired,
  showCommandControls: PropTypes.bool,
  width: PropTypes.number,
};

SpaceGame.defaultProps = {
  taskId: 'nameless-task',
  actionsLimit: { limit: null },
  showCommandControls: false,
  width: 280,
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

