import { getCode, getTaskSourceText } from '../selectors/taskEnvironment';
import { getColor, getPosition, isSolved, isDead, getGameStage } from '../selectors/gameState';
import { interpretRoboCode } from '../core/roboCodeInterpreter';
import { downloadTextFile } from '../utils/files';


export const CREATE_TASK_ENVIRONMENT = 'FLOCS.CREATE_TASK_ENVIRONMENT';
export const SET_TASK = 'FLOCS.SET_TASK';
export const CHANGE_SETTING = 'FLOCS.CHANGE_SETTING';
export const CHANGE_CODE = 'FLOCS.CHANGE_CODE';
export const RESET_GAME = 'FLOCS.RESET_GAME';
export const EXECUTE_COMMAND = 'FLOCS.EXECUTE_COMMAND';
export const INTERPRETATION_STARTED = 'FLOCS.INTERPRETATION_STARTED';
export const TASK_ATTEMPTED = 'FLOCS.TASK_ATTEMPTED';


export function createTaskEnvironment(taskEnvironmentId) {
  return {
    type: CREATE_TASK_ENVIRONMENT,
    payload: { taskEnvironmentId },
  };
}


export function setTask(taskEnvironmentId, task) {
  return {
    type: SET_TASK,
    payload: { taskEnvironmentId, task },
  };
}


export function exportTask(taskEnvironmentId) {
  return (dispatch, getState) => {
    try {
      const taskSourceText = getTaskSourceText(getState(), taskEnvironmentId);
      downloadTextFile('untitled-task.md', taskSourceText);
    } catch (err) {
      alert(`Export failed: ${err.message}`);
    }
  };
}


export function changeCode(taskEnvironmentId, code) {
  return {
    type: CHANGE_CODE,
    payload: { taskEnvironmentId, code },
  };
}


export function changeSetting(taskEnvironmentId, settingText) {
  return {
    type: CHANGE_SETTING,
    payload: { taskEnvironmentId, settingText },
  };
}


export function taskAttempted(taskEnvironmentId) {
  return {
    type: TASK_ATTEMPTED,
    payload: { taskEnvironmentId },
  };
}


export function runProgram(taskEnvironmentId) {
  return (dispatch, getState) => {
    const startingInterpretation = () => new Promise(resolve => {
      dispatch(interpretationStarted(taskEnvironmentId));
      setTimeout(resolve);
    });
    const code = getCode(getState(), taskEnvironmentId);
    const context = {
      doAction: (action) => dispatch(executeCommand(taskEnvironmentId, action)),
      finalize: () => dispatch(executeCommand(taskEnvironmentId, 'finalize')),
      color: () => getColor(getState(), taskEnvironmentId),
      position: () => getPosition(getState(), taskEnvironmentId),
      isSolved: () => isSolved(getState(), taskEnvironmentId),
      isDead: () => isDead(getState(), taskEnvironmentId),
      interrupted: () => getGameStage(getState(), taskEnvironmentId) === 'initial',
    };
    const interpretingPromise = startingInterpretation()
      .then(() => interpretRoboCode(code, context))
      .then(() => dispatch(taskAttempted(taskEnvironmentId)));
    return interpretingPromise;
  };
}


export function interpretationStarted(taskEnvironmentId) {
  return {
    type: INTERPRETATION_STARTED,
    payload: { taskEnvironmentId },
  };
}


export function executeCommand(taskEnvironmentId, command) {
  return {
    type: EXECUTE_COMMAND,
    payload: { taskEnvironmentId, command },
  };
}


export function resetGame(taskEnvironmentId) {
  return {
    type: RESET_GAME,
    payload: { taskEnvironmentId },
  };
}
