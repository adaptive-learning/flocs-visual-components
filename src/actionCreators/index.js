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
import { showInstructions } from './instructions';

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
  showInstructions,
};

export default flocsActionCreators;
