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
or you can employ Redux containers communicating via shared application store.
To provide flocs components with needed context (store, localization and theme),
wrap your app component into `FlocsProvider`:

```
<FlocsProvider reducers={{ myApp: myAppReducer }}>
  <MyAppContainer>
    <TaskEditorContainer />
  </MyAppContainer>
</FlocsProvider>
```

You can make your app reducers respond to actions dispatched by flocs components.
You can also access data in the flocs store using provided selector functions.

See more [examples](/examples).
