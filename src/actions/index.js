import { setTask, changeCode, runProgram, taskAttempted, executeCommand, resetGame } from './taskEnvironment';
import { SET_TASK, CHANGE_CODE, TASK_ATTEMPTED, RESET_GAME, EXECUTE_COMMAND } from './taskEnvironment';

const flocsActionCreators = {
  setTask,
  changeCode,
  runProgram,
  taskAttempted,
  executeCommand,
  resetGame,
};

const flocsActions = {
  SET_TASK,
  CHANGE_CODE,
  TASK_ATTEMPTED,
  RESET_GAME,
  EXECUTE_COMMAND,
};

export { flocsActionCreators, flocsActions };
