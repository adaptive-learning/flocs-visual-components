import React from 'react';
import ReactDOM from 'react-dom';
import { SpaceGame } from 'flocs-visual-components';
//import { TaskStatus } from 'flocs-visual-components/components';

console.log('jop');
const component = (
  <SpaceGame
    fields='TBA'
  />
);
const mountElement = document.getElementById('spaceGameExample');
ReactDOM.render(component, mountElement);
