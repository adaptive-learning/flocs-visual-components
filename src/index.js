import SpaceGame from './components/SpaceGame';
import CodeEditor from './components/CodeEditor';
import BlocklyEditor from './components/BlocklyEditor';
import TasksTable from './components/TasksTable';
import TaskEnvironment from './components/TaskEnvironment';
import TaskEditor from './components/TaskEditor';
import SpaceGameContainer from './containers/SpaceGameContainer';
import CodeEditorContainer from './containers/CodeEditorContainer';
import TaskEnvironmentContainer from './containers/TaskEnvironmentContainer';
import TaskEditorContainer from './containers/TaskEditorContainer';
import { flocsComponentsReducer } from './reducers';
import { flocsSelector } from './selectors';
import flocsActionCreators from './actionCreators';
import * as flocsActionTypes from './actionTypes';
import { parseSpaceWorld } from './core/spaceWorldDescription';
import { initGlobalBlockly } from './core/blockly';
import { initGlobalTheme } from './theme';
import FlocsProvider from './FlocsProvider';

// global initializations
initGlobalTheme();
initGlobalBlockly();


export {
  // context provider (store, theme, localization)
  FlocsProvider,

  // components
  SpaceGame,
  CodeEditor,
  BlocklyEditor,
  TasksTable,
  TaskEnvironment,
  TaskEditor,

  // containers
  SpaceGameContainer,
  CodeEditorContainer,
  TaskEnvironmentContainer,
  TaskEditorContainer,

  // selectors, reducers and actions
  flocsSelector,
  flocsComponentsReducer,
  flocsActionCreators,
  flocsActionTypes,

  // core functions and objects
  parseSpaceWorld,
};
