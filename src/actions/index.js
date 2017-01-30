import { switchVimMode,
         SWITCH_VIM_MODE } from './taskEditor';
import { createTaskEnvironment,
         setTask,
         changeSetting,
         exportTask,
         changeCode,
         changeRoboAst,
         runProgram,
         taskAttempted,
         doActionMove,
         resetGame,
         CREATE_TASK_ENVIRONMENT,
         SET_TASK,
         CHANGE_SETTING,
         CHANGE_CODE,
         CHANGE_ROBO_AST,
         TASK_ATTEMPTED,
         INTERPRETATION_STARTED,
         RESET_GAME,
         DO_ACTION,
         MOVE } from './taskEnvironment';

const flocsActionCreators = {
  createTaskEnvironment,
  setTask,
  changeSetting,
  exportTask,
  changeCode,
  changeRoboAst,
  runProgram,
  taskAttempted,
  doActionMove,
  resetGame,
  switchVimMode,
};

const flocsActions = {
  CREATE_TASK_ENVIRONMENT,
  SET_TASK,
  CHANGE_SETTING,
  CHANGE_CODE,
  CHANGE_ROBO_AST,
  TASK_ATTEMPTED,
  RESET_GAME,
  DO_ACTION,
  MOVE,
  INTERPRETATION_STARTED,
  SWITCH_VIM_MODE,
};

export { flocsActionCreators, flocsActions };
