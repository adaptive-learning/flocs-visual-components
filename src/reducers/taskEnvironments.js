import { flocsActions as actions } from '../actions';
import { parseSpaceWorld } from '../core/spaceWorldDescription';


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
    case actions.INTERPRETATION_STARTED:
      return updateTaskEnvironment(state, startInterpretation, action.payload);
    case actions.TASK_ATTEMPTED:
      return updateTaskEnvironment(state, endInterpretation, action.payload);
    default:
      return state;
  }
}


const emptyTask = {
  setting: {
    fields: [[]],
    actionsLimit: null,
    energy: null,
  },
};

const initialTaskEnvironment = {
  task: emptyTask,
  code: '',
  interpreting: false,
  pastActions: [],
  currentAction: null,
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
    task: taskWithDefaults,
    code: '',
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


function changeSetting(taskEnvironment, { settingText }) {
  try {
    const setting = { fields: parseSpaceWorld(settingText) };
    const updatedTask = { ...taskEnvironment.task, setting };
    return { ...taskEnvironment, task: updatedTask, invalidSettingText: null };
  } catch (err) {
    return { ...taskEnvironment, invalidSettingText: settingText };
  }
}


function changeCode(taskEnvironment, { code }) {
  return { ...taskEnvironment, code };
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
