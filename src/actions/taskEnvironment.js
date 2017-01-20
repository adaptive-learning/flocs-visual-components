import { getCode, getTaskSourceText } from '../selectors/taskEnvironment';
import { getColor, getPosition, isSolved, isDead, getGameStage } from '../selectors/gameState';
import { interpretRoboCode, InterpreterError } from '../core/roboCodeInterpreter';
import { downloadTextFile } from '../utils/files';


export const CREATE_TASK_ENVIRONMENT = 'FLOCS.CREATE_TASK_ENVIRONMENT';
export const SET_TASK = 'FLOCS.SET_TASK';
export const CHANGE_SETTING = 'FLOCS.CHANGE_SETTING';
export const CHANGE_CODE = 'FLOCS.CHANGE_CODE';
export const RESET_GAME = 'FLOCS.RESET_GAME';
export const DO_ACTION = 'FLOCS.DO_ACTION';
export const MOVE = 'FLOCS.MOVE';
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
      doActionMove: (action) => dispatch(doActionMove(taskEnvironmentId, action)),
      color: () => getColor(getState(), taskEnvironmentId),
      position: () => getPosition(getState(), taskEnvironmentId),
      isSolved: () => isSolved(getState(), taskEnvironmentId),
      isDead: () => isDead(getState(), taskEnvironmentId),
      interrupted: () => getGameStage(getState(), taskEnvironmentId) === 'initial',
    };
    const interpretingPromise = startingInterpretation()
      .then(() => interpretRoboCode(code, context))
      .catch(handleInterpreterError)
      .then(() => dispatch(taskAttempted(taskEnvironmentId)));
    return interpretingPromise;
  };
}

function handleInterpreterError(error) {
  if (error instanceof InterpreterError) {
    alert(error.message);
  } else {
    throw error;
  }
}


export function interpretationStarted(taskEnvironmentId) {
  return {
    type: INTERPRETATION_STARTED,
    payload: { taskEnvironmentId },
  };
}


export function doActionMove(taskEnvironmentId, action) {
  const pauseLength = 300;
  return (dispatch) => {
    const actionMovePromise = new Promise(resolve => {
      dispatch(doAction(taskEnvironmentId, action));
      setTimeout(() => {
        dispatch(move(taskEnvironmentId));
        resolve();
      }, pauseLength);
    });
    return actionMovePromise;
  };
}


export function doAction(taskEnvironmentId, action) {
  return {
    type: DO_ACTION,
    payload: { taskEnvironmentId, action },
  };
}


export function move(taskEnvironmentId) {
  return {
    type: MOVE,
    payload: { taskEnvironmentId },
  };
}


export function resetGame(taskEnvironmentId) {
  return {
    type: RESET_GAME,
    payload: { taskEnvironmentId },
  };
}
