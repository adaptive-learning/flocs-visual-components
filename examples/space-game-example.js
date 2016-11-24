import React from 'react';
import ReactDOM from 'react-dom';
import { SpaceGame } from 'flocs-visual-components';

function handleControlClicked(control) {
  console.log('control:', control);
}

// TODO: replace unreadable task setting by parseWorldDescription(`b |bA|....`)
const gameState= {
  fields: [[["b", []], ["b", ["A"]], ["b", ["M"]], ["b", ["A"]], ["b", []]], [["k", []], ["k", ["A"]], ["k", []], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", ["M"]], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", []], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", ["M"]], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", []], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", ["M"]], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", []], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", ["S"]], ["k", ["A"]], ["k", []]]],
  stage: 'initial'
}
// TODO: default values, e.g. command controls to false
const component = (
  <SpaceGame
    gameState={gameState}
    showCommandControls={false}
    onControlClicked={handleControlClicked}
  />
);

const mountElement = document.getElementById('spaceGameExample');
ReactDOM.render(component, mountElement);
