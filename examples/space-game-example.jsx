import React from 'react';
import ReactDOM from 'react-dom';
import { SpaceGame, parseTaskSetting } from 'flocs-visual-components';

function handleControlClicked(control) {
  console.log('control:', control);
}

const gameState = {
  ...parseTaskSetting(`\
    |b |bM|bS|b |b |
    |k |k |k |kA|k |
    |kA|k |k |k |kD|
    |k |kM|k |k |k |
    |k |k |k |k |kM|`),
  stage: 'solved',
};

const component = (
  <SpaceGame
    gameState={gameState}
    onControlClicked={handleControlClicked}
  />
);

const mountElement = document.getElementById('spaceGameExample');
if (mountElement !== null) {
  ReactDOM.render(component, mountElement);
}
