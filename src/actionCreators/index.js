import { switchVimMode } from './taskEditor';
import { createTaskEnvironment,
         setTask,
         changeSetting,
         exportTask,
         changeCode,
         changeRoboAst,
         changeGamePanelWidth,
         runProgram,
         taskAttempted,
         doActionMove,
         resetGame,
         setEditorType } from './taskEnvironment';

// TODO: merge them automatically
const flocsActionCreators = {
  createTaskEnvironment,
  setTask,
  changeSetting,
  exportTask,
  changeCode,
  changeRoboAst,
  changeGamePanelWidth,
  runProgram,
  taskAttempted,
  doActionMove,
  resetGame,
  switchVimMode,
  setEditorType,
};

export default flocsActionCreators;
