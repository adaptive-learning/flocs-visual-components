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
import { flocsSelector } from './selectors';
import flocsActionCreators from './actionCreators';
import * as flocsActionTypes from './actionTypes';
import { parseSpaceWorld } from './core/spaceWorldDescription';
import { parseTaskSourceText } from './core/taskSourceParser';
import { initGlobalBlockly } from './core/blockly';
import { initGlobalTheme } from './theme';
import FlocsProvider from './FlocsProvider';

// global initializations
initGlobalTheme();
initGlobalBlockly();

export {
  FlocsProvider,
  flocsSelector,
  flocsActionCreators,
  flocsActionTypes,

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

  // core functions and objects
  parseSpaceWorld,
  parseTaskSourceText,
};
