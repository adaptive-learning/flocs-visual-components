import { switchVimMode,
         SWITCH_VIM_MODE } from './taskEditor';
import { createTaskEnvironment,
         setTask,
         changeSetting,
         exportTask,
         changeCode,
         runProgram,
         taskAttempted,
         executeCommand,
         resetGame,
         CREATE_TASK_ENVIRONMENT,
         SET_TASK,
         CHANGE_SETTING,
         CHANGE_CODE,
         TASK_ATTEMPTED,
         INTERPRETATION_STARTED,
         RESET_GAME,
         EXECUTE_COMMAND } from './taskEnvironment';

const flocsActionCreators = {
  createTaskEnvironment,
  setTask,
  changeSetting,
  exportTask,
  changeCode,
  runProgram,
  taskAttempted,
  executeCommand,
  resetGame,
  switchVimMode,
};

const flocsActions = {
  CREATE_TASK_ENVIRONMENT,
  SET_TASK,
  CHANGE_SETTING,
  CHANGE_CODE,
  TASK_ATTEMPTED,
  RESET_GAME,
  EXECUTE_COMMAND,
  INTERPRETATION_STARTED,
  SWITCH_VIM_MODE,
};

export { flocsActionCreators, flocsActions };
