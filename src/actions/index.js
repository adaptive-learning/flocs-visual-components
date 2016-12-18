import { createTaskEnvironment,
         setTask,
         changeCode,
         runProgram,
         taskAttempted,
         executeCommand,
         resetGame,
         CREATE_TASK_ENVIRONMENT,
         SET_TASK,
         CHANGE_CODE,
         TASK_ATTEMPTED,
         RESET_GAME,
         EXECUTE_COMMAND } from './taskEnvironment';

const flocsActionCreators = {
  createTaskEnvironment,
  setTask,
  changeCode,
  runProgram,
  taskAttempted,
  executeCommand,
  resetGame,
};

const flocsActions = {
  CREATE_TASK_ENVIRONMENT,
  SET_TASK,
  CHANGE_CODE,
  TASK_ATTEMPTED,
  RESET_GAME,
  EXECUTE_COMMAND,
};

export { flocsActionCreators, flocsActions };
