import { setTask, changeCode, runProgram, executeCommand, resetGame } from './taskEnvironment';
import { SET_TASK, CHANGE_CODE, RESET_GAME, EXECUTE_COMMAND } from './taskEnvironment';

const flocsActionCreators = {
  setTask,
  changeCode,
  runProgram,
  executeCommand,
  resetGame,
};

const flocsActions = {
  SET_TASK,
  CHANGE_CODE,
  RESET_GAME,
  EXECUTE_COMMAND,
};

export { flocsActionCreators, flocsActions };
