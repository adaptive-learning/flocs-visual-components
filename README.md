# Flocs-Visual-Components

React visual components for [Flocs project](https://github.com/adaptive-learning/flocs-web).

## Install

Install `flocs-visual-component` package from the npm registry:

```
npm install --save flocs-visual-components
```

Copy library static assets (content of `lib/static`) to the place where you serve static assets.
The assets need to be available under `/static/[images|fonts]/[name]` url.
You can achieve this automatically using, for example, webpack with the following configuration.

```javascript
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  // ...
  plugins: [
    new CopyWebpackPlugin([
      { from: 'node_modules/flocs-visual-components/lib/static/images'
      , to: 'static/images'
      },
    ]),
    // ...
  ]
};
```

## Usage

You can either use just standalone React presentational components,
or you can employ Redux containers communicating via store, together with provided reducer and actions.

### React Presentational Components

Just import one of the provided presentational components (from `flocs-visual-components`),
then create a component providing props and render it using React. Example in JSX follows:


```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { SpaceGame } from 'flocs-visual-components';

function handleControlClicked(control) {
  console.log('control:', control);
}

const gameState= {
  fields: [[["b", []], ["b", []], ["b", []]], [["k", ["A"]], ["k", ["S"]], ["k", []]]],
  stage: 'initial'
}
const component = (
  <SpaceGame
    gameState={gameState}
    showCommandControls={true}
    onControlClicked={handleControlClicked}
  />
);

const mountElement = document.getElementById('spaceGameExample');
ReactDOM.render(component, mountElement);
```


### Redux Containers

If you want more components to communicate with each other, the simplest way is to use provided containers and reducer inside a redux app.
The dedicated reducer is called `flocsComponentsReducer` and needs to be connected to your root reducer on the `'flocsComponents'` key.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { CodeEditorContainer, SpaceGameContainer } from 'flocs-visual-components';
import { flocsComponentsReducer } from 'flocs-visual-components';

function myAppReducer(state={}, action) {
  console.log('myApp reducer listening to action:', action);
  return state;
}

// combine your app reducers with flocsComponentsReducer
const reducers = combineReducers({
  myApp: myAppReducer,
  flocsComponents: flocsComponentsReducer
});
const store = createStore(reducers);

// connect used containers by shared store (and common taskSessionId)
const app = (
  <Provider store={store}>
    <div>
      <SpaceGameContainer taskSessionId="single"/>
      <CodeEditorContainer taskSessionId="single"/>
    </div>
  </Provider>
);
ReactDOM.render(app, document.getElementById('taskSessionExample'));
```

If you want, you can make your app reducers to respond on actions dispatched by the containers.
You can also use data in the created substate (`state.flocsComponents`), preferably via provided selector functions.
(TBA: examples)
