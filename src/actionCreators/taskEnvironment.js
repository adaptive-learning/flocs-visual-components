import { CREATE_TASK_ENVIRONMENT,
         SET_TASK,
         CHANGE_SETTING,
         CHANGE_CODE,
         CHANGE_ROBO_AST,
         RESET_GAME,
         DO_ACTION,
         MOVE,
         EVOLVE_WORLD,
         INTERPRETATION_STARTED,
         TASK_ATTEMPTED,
         CHANGE_GAME_PANEL_WIDTH,
         SET_EDITOR_TYPE } from '../actionTypes';
import { getTaskId,
         getRoboAst,
         getCode,
         getActionsLimit,
         getEditorType,
         getTaskSourceText,
         isInterpreting } from '../selectors/taskEnvironment';
import { getColor, getPosition, isSolved, isDead, getGameStage } from '../selectors/gameState';
import { interpretRoboAst, interpretRoboCode, InterpreterError } from '../core/roboCodeInterpreter';
import { parseTaskSourceText } from '../core/taskSourceParser';
import { downloadTextFile, loadTextFile } from '../utils/files';


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
      const taskId = getTaskId(getState(), taskEnvironmentId);
      const taskSourceText = getTaskSourceText(getState(), taskEnvironmentId);
      downloadTextFile(`${taskId}.md`, taskSourceText);
    } catch (err) {
      alert(`Export failed: ${err.message}`);
    }
  };
}


export function importTask(taskEnvironmentId) {
  return (dispatch) => {
    try {
      loadTextFile().then(taskSourceText => {
        const task = parseTaskSourceText(taskSourceText);
        dispatch(setTask(taskEnvironmentId, task));
      });
    } catch (err) {
      alert(`Import failed: ${err.message}`);
    }
  };
}


export function changeCode(taskEnvironmentId, code) {
  return {
    type: CHANGE_CODE,
    payload: { taskEnvironmentId, code },
  };
}


export function changeRoboAst(taskEnvironmentId, roboAst) {
  return {
    type: CHANGE_ROBO_AST,
    payload: { taskEnvironmentId, roboAst },
  };
}


export function changeSetting(taskEnvironmentId, taskSource) {
  return {
    type: CHANGE_SETTING,
    payload: { taskEnvironmentId, taskSource },
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
    const actions = getActionsLimit(getState(), taskEnvironmentId);
    if (actions.limit !== null && actions.used > actions.limit) {
      const message = `Violated actions limit: ${actions.used}/${actions.limit}`;
      alert(message);
      return Promise.resolve(message);
    }
    const startingInterpretation = () => new Promise(resolve => {
      dispatch(interpretationStarted(taskEnvironmentId));
      setTimeout(resolve);
    });
    const context = {
      doActionMove: (action) => dispatch(doActionMove(taskEnvironmentId, action)),
      color: () => getColor(getState(), taskEnvironmentId),
      position: () => getPosition(getState(), taskEnvironmentId),
      isSolved: () => isSolved(getState(), taskEnvironmentId),
      isDead: () => isDead(getState(), taskEnvironmentId),
      interrupted: () => getGameStage(getState(), taskEnvironmentId) === 'initial',
    };
    const roboAst = getRoboAst(getState(), taskEnvironmentId);
    let interpret = () => interpretRoboAst(roboAst, context);
    const editorType = getEditorType(getState(), taskEnvironmentId);
    if (editorType === 'code') {
      const roboCode = getCode(getState(), taskEnvironmentId);
      console.log('code', roboCode);
      interpret = () => interpretRoboCode(roboCode, context);
    }
    const interpretingPromise = startingInterpretation()
      .then(interpret)
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
  return (dispatch, getState) => {
    const actionMovePromise = new Promise(resolve => {
      if (!isInterpreting(getState(), taskEnvironmentId)) {
        resolve();
      } else {
        dispatch(doAction(taskEnvironmentId, action));
        setTimeout(resolve, 200);
      }
    }).then(() => {
      if (!isInterpreting(getState(), taskEnvironmentId)) {
        return Promise.resolve('stopped');
      }
      dispatch(move(taskEnvironmentId));
      return new Promise(resolve => setTimeout(resolve, 200));
    }).then(() => {
      if (isInterpreting(getState(), taskEnvironmentId)) {
        dispatch(evolveWorld(taskEnvironmentId));
      }
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


export function evolveWorld(taskEnvironmentId) {
  return {
    type: EVOLVE_WORLD,
    payload: { taskEnvironmentId },
  };
}


export function resetGame(taskEnvironmentId) {
  return {
    type: RESET_GAME,
    payload: { taskEnvironmentId },
  };
}


export function changeGamePanelWidth(taskEnvironmentId, gamePanelWidth) {
  return {
    type: CHANGE_GAME_PANEL_WIDTH,
    payload: { taskEnvironmentId, gamePanelWidth },
  };
}


export function setEditorType(taskEnvironmentId, editorType) {
  return {
    type: SET_EDITOR_TYPE,
    payload: { taskEnvironmentId, editorType },
  };
}

export const hello = 'ahoj';
