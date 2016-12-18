import SpaceGame from './components/SpaceGame';
import CodeEditor from './components/CodeEditor';
import SpaceGameContainer from './containers/SpaceGameContainer';
import CodeEditorContainer from './containers/CodeEditorContainer';
import { flocsComponentsReducer } from './reducers';
import { flocsSelector } from './selectors';
import { flocsActionCreators, flocsActions } from './actions';

export {
  // components
  SpaceGame,
  CodeEditor,

  // containers
  SpaceGameContainer,
  CodeEditorContainer,

  // selectors, reducers and actions
  flocsSelector,
  flocsComponentsReducer,
  flocsActionCreators,
  flocsActions,
};
