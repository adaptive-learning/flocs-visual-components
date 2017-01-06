# Flocs-Visual-Components

React visual components for [Flocs project](https://github.com/adaptive-learning/flocs-web).

## Install

Install `flocs-visual-component` package from the npm registry:

```
npm install --save flocs-visual-components
```

Next, make sure to include [babel-polyfill](https://babeljs.io/docs/usage/polyfill/)
in your bundled app, to support new ES6 features (such as `Object.values`) in all browsers
(these features are used in this library, so it is really necessary to install and include a polyfill).

Finally, copy library static assets (content of `lib/static`) to the place where you serve static assets.
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
What you need to do:

* Connect dedicated `flocsComponentsReducer` to your root reducer on the `'flocsComponents'` key.
* Apply `thunk` middleware (if you haven't already).
* Create desired container components and give them same `taskEnvironmentId`.

```javascript
// combine your app reducers with flocsComponentsReducer
const rootReducer = combineReducers({
  myApp: myAppReducer,
  flocsComponents: flocsComponentsReducer
});

// create store with thunk middleware
const middleware = applyMiddleware(thunk);
const store = createStore(rootReducer, middleware);

// set a task in a task environment
const task = { /* ... */ }
const taskEnvId = "single";
store.dispatch(flocsActionCreators.createTaskEnvironment(taskEnvId));
store.dispatch(flocsActionCreators.setTask(taskEnvId, task));

// create your app component giving paired components same taskEnvironmentId
const appComponent = (
  <Provider store={store}>
    <div>
      <SpaceGameContainer taskEnvironmentId={taskEnvId}/>
      <CodeEditorContainer taskEnvironmentId={taskEnvId}/>
    </div>
  </Provider>
);
```

If you want, you can make your app reducers to respond on actions dispatched by the containers.
You can also use data in the created substate, preferably via provided selector functions.
