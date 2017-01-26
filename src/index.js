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
import { flocsActionCreators, flocsActions } from './actions';
import { parseSpaceWorld } from './core/spaceWorldDescription';
import { initGlobalBlockly } from './core/blockly';


initGlobalBlockly();

export {
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
  flocsActions,

  // core functions and objects
  parseSpaceWorld,
};
