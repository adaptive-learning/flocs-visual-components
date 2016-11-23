# Flocs-Visual-Components

React visual components for [Flocs project](https://github.com/adaptive-learning/flocs-web).

## Install

TBA

## Usage

### SpaceGame

```javascript
import { SpaceGame } from 'flocs-visual-components';

const gameState = {
  fields: '...',
  spaceship: '...',
}

function handleControlClicked(control) {
  console.log('control:', control);
}

function handleGameOver(gameStatus) {
  console.log('game over:', gameStatus);
}

// TBA...
  <SpaceGame
    gameState={gameState},
    controls={['run']}
    onControlClicked={handleControlClicked},
    onGameOver={handleGameOver},
  />
```


### Wiring SpaceGame and BlocklyEditor

```javascript
import { BlocklyEditorContainer } from 'flocs-visual-components';
import { SpaceGameContainer } from 'flocs-visual-components';
import { taskSessionReducer } from 'flocs-visual-components/reducers';

// TBA: wiring via taskSessionReducer
// TBA: + custom reactions (reducers) for some editor or game events

// TBA...
  <div>
    <BlocklyEditorContainer taskSessionId="1"/>
    <SpaceGameContainer taskSessionId="1"/>
  </div>
```

