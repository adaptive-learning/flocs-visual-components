import { getCode } from '../selectors/taskEnvironment';
import { getColor, getPosition } from '../selectors/gameState';
import { interpretRoboCode } from '../robocode/interpreter';


export const SET_TASK         = 'FLOCS.SET_TASK';
export const CHANGE_CODE      = 'FLOCS.CHANGE_CODE';
export const TASK_ATTEMPTED   = 'FLOCS.TASK_ATTEMPTED';
export const RESET_GAME       = 'FLOCS.RESET_GAME';
export const EXECUTE_COMMAND  = 'FLOCS.EXECUTE_COMMAND';


export function setTask(taskEnvironmentId, task) {
  return {
    type: SET_TASK,
    payload: { taskEnvironmentId, task }
  };
};


export function changeCode(taskEnvironmentId, code) {
  return {
    type: CHANGE_CODE,
    payload: { taskEnvironmentId, code }
  };
};


export function taskAttempted(taskEnvironmentId) {
  return {
    type: TASK_ATTEMPTED,
    payload: { taskEnvironmentId }
  };
};


export function runProgram(taskEnvironmentId) {
  return function(dispatch, getState) {
    const code = getCode(getState(), taskEnvironmentId);
    const context = {
      move: (command) => dispatch(executeCommand(taskEnvironmentId, command)),
      color: () => getColor(getState(), taskEnvironmentId),
      position: () => getPosition(getState(), taskEnvironmentId),
    }
    interpretRoboCode(code, context).then(
      () => dispatch(taskAttempted(taskEnvironmentId))
    );
  };
};


export function executeCommand(taskEnvironmentId, command) {
  return {
    type: EXECUTE_COMMAND,
    payload: { taskEnvironmentId, command }
  };
};


export function resetGame(taskEnvironmentId) {
  return {
    type: RESET_GAME,
    payload: { taskEnvironmentId }
  };
};
