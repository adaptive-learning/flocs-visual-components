import { flocsActions as actions } from '../actions';
import { parseSpaceWorld } from '../core/spaceWorldDescription';
import { parseRoboCode, RoboCodeSyntaxError } from '../core/roboCodeParser';
import { generateRoboCode } from '../core/roboCodeGenerator';


export default function reduceTaskEnvironments(state = {}, action) {
  switch (action.type) {
    case actions.CREATE_TASK_ENVIRONMENT:
      return createTaskEnvironment(state, action.payload.taskEnvironmentId);
    case actions.SET_TASK:
      return updateTaskEnvironment(state, setTask, action.payload);
    case actions.CHANGE_SETTING:
      return updateTaskEnvironment(state, changeSetting, action.payload);
    case actions.DO_ACTION:
      return updateTaskEnvironment(state, doAction, action.payload);
    case actions.MOVE:
      return updateTaskEnvironment(state, move, action.payload);
    case actions.RESET_GAME:
      return updateTaskEnvironment(state, resetGame, action.payload);
    case actions.CHANGE_CODE:
      return updateTaskEnvironment(state, changeCode, action.payload);
    case actions.CHANGE_ROBO_AST:
      return updateTaskEnvironment(state, changeRoboAst, action.payload);
    case actions.INTERPRETATION_STARTED:
      return updateTaskEnvironment(state, startInterpretation, action.payload);
    case actions.TASK_ATTEMPTED:
      return updateTaskEnvironment(state, endInterpretation, action.payload);
    case actions.CHANGE_GAME_PANEL_WIDTH:
      return updateTaskEnvironment(state, changeGamePanelWidth, action.payload);
    case actions.SET_EDITOR_TYPE:
      return updateTaskEnvironment(state, setEditorType, action.payload);
    default:
      return state;
  }
}


const emptyTask = {
  taskId: '',
  setting: {
    fields: [[]],
    actionsLimit: null,
    energy: null,
  },
};

const initialTaskEnvironment = {
  task: emptyTask,
  editorType: 'blockly',
  editorSessionId: 0,
  roboAst: { head: 'start', body: [] },
  code: '',
  validCode: true,
  interpreting: false,
  pastActions: [],
  currentAction: null,
  gamePanelWidth: 280,
};


function createTaskEnvironment(taskEnvironments, taskEnvironmentId) {
  if (taskEnvironmentId in taskEnvironments) {
    return taskEnvironments;
  }
  return { ...taskEnvironments, [taskEnvironmentId]: initialTaskEnvironment };
}


function updateTaskEnvironment(taskEnvironments, updateFn, args) {
  return updateEntity(taskEnvironments, args.taskEnvironmentId, updateFn, args);
}


function updateEntity(entities, id, updateFn, args) {
  const oldEntity = (id in entities) ? entities[id] : initialTaskEnvironment;
  const updatedEntity = updateFn(oldEntity, args);
  return { ...entities, [id]: updatedEntity };
}


function setTask(taskEnvironment, { task }) {
  const taskWithDefaults = addDefaults(task);
  return {
    ...taskEnvironment,
    editorSessionId: taskEnvironment.editorSessionId + 1,
    task: taskWithDefaults,
    roboAst: { head: 'start', body: [] },
    code: '',
    validCode: true,
    pastActions: [],
    currentAction: null,
    interpreting: false,
  };
}


function addDefaults(task) {
  // TODO: better way to specify defaults?
  const setting = {
    actionsLimit: null,
    energy: null,
    ...task.setting,
  };
  const taskWithDefaults = {
    category: null,
    ...task,
    setting,
  };
  return taskWithDefaults;
}


function changeSetting(taskEnvironment, { taskSource }) {
  const { task, invalidSpaceWorldText } = taskEnvironment;
  const { taskId, category, energy, actionsLimit, spaceWorldText } = taskSource;
  let newInvalidSpaceWorldText = invalidSpaceWorldText;
  let newFields = null;
  if (spaceWorldText !== undefined) {
    try {
      newFields = parseSpaceWorld(spaceWorldText);
      newInvalidSpaceWorldText = null;
    } catch (err) {
      newFields = null;
      newInvalidSpaceWorldText = spaceWorldText;
    }
  }
  const updatedTask = {
    taskId: (taskId !== undefined) ? taskId : task.taskId,
    category: (category !== undefined) ? category : task.category,
    setting: {
      fields: (newFields !== null) ? newFields : task.setting.fields,
      energy: (energy !== undefined) ? energy : task.setting.energy,
      actionsLimit: (actionsLimit !== undefined) ? actionsLimit : task.setting.actionsLimit,
    },
  };
  const updatedTaskWithDefaults = addDefaults(updatedTask);
  const updatedTaskEnvironment = {
    ...taskEnvironment,
    task: updatedTaskWithDefaults,
    invalidSpaceWorldText: newInvalidSpaceWorldText,
  };
  return updatedTaskEnvironment;
}


function changeCode(taskEnvironment, { code }) {
  let roboAst = taskEnvironment.roboAst;
  let validCode = true;
  try {
    roboAst = parseRoboCode(code);
  } catch (error) {
    if (error instanceof RoboCodeSyntaxError) {
      validCode = false;
    } else {
      throw error;
    }
  }
  return { ...taskEnvironment, code, validCode, roboAst };
}


function changeRoboAst(taskEnvironment, { roboAst }) {
  const code = generateRoboCode(roboAst);
  const validCode = true;
  return { ...taskEnvironment, code, validCode, roboAst };
}


function doAction(taskEnvironment, { action }) {
  const updatedTaskEnvironment = { ...taskEnvironment, currentAction: action };
  return updatedTaskEnvironment;
}


function move(taskEnvironment) {
  const { pastActions, currentAction } = taskEnvironment;
  const augmentedPastActions = (currentAction) ? [...pastActions, currentAction] : pastActions;
  const updatedTaskEnvironment = {
    ...taskEnvironment,
    pastActions: augmentedPastActions,
    currentAction: null,
  };
  return updatedTaskEnvironment;
}


function resetGame(taskEnvironment) {
  return {
    ...taskEnvironment,
    interpreting: false,
    pastActions: [],
    currentAction: null,
  };
}


function startInterpretation(taskEnvironment) {
  return { ...taskEnvironment, interpreting: true };
}


function endInterpretation(taskEnvironment) {
  return { ...taskEnvironment, interpreting: false };
}


function changeGamePanelWidth(taskEnvironment, { gamePanelWidth }) {
  return { ...taskEnvironment, gamePanelWidth };
}


function setEditorType(taskEnvironment, { editorType }) {
  return { ...taskEnvironment, editorType };
}
