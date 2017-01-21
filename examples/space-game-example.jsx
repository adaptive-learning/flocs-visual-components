import React from 'react';
import ReactDOM from 'react-dom';
import { SpaceGame, parseTaskSetting } from 'flocs-visual-components';

function handleControlClicked(control) {
  console.log('control:', control);
}

const gameState = {
  ...parseTaskSetting(`\
    |g |gM|gS|g |g |
    |b |b |b |bA|b |
    |bA|b |b |b |bD|
    |b |bM|b |b |b |
    |b |b |b |b |bM|`),
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
