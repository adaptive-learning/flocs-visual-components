import { getCode } from '../selectors/taskSession';
import { getColor, getPosition } from '../selectors/gameState';
import { interpretRoboCode } from '../robocode/interpreter';

export const CHANGE_CODE = 'CHANGE_CODE';
export function changeCode(taskSessionId, code) {
  return {
    type: CHANGE_CODE,
    payload: { taskSessionId, code }
  };
};


export function runProgram(taskSessionId) {
  return function(dispatch, getState) {
    const code = getCode(getState(), taskSessionId);
    const context = {
      move: (command) => dispatch(executeCommand(taskSessionId, command)),
      color: () => getColor(getState(), taskSessionId),
      position: () => getPosition(getState(), taskSessionId),
    }
    interpretRoboCode(code, context);
  };
};


export const EXECUTE_COMMAND = 'EXECUTE_COMMAND';
export function executeCommand(taskSessionId, command) {
  return {
    type: EXECUTE_COMMAND,
    payload: { taskSessionId, command }
  };
};


export const RESET_GAME = 'RESET_GAME';
export function resetGame(taskSessionId) {
  return {
    type: RESET_GAME,
    payload: { taskSessionId }
  };
};
