import { flocsActions as actions } from '../actions';


function reduceTaskEnvironments(state = {}, action) {
  switch (action.type) {
    case actions.CREATE_TASK_ENVIRONMENT:
      return createTaskEnvironment(state, action.payload.taskEnvironmentId);
    case actions.SET_TASK:
      return updateTaskEnvironment(state, setTask, action.payload);
    case actions.EXECUTE_COMMAND:
      return updateTaskEnvironment(state, executeCommand, action.payload);
    case actions.RESET_GAME:
      return updateTaskEnvironment(state, resetGame, action.payload);
    case actions.CHANGE_CODE:
      return updateTaskEnvironment(state, changeCode, action.payload);
    default:
      return state;
  }
}


const emptyTask = {
  setting: {
    fields: [[]],
  },
};

const initialTaskEnvironment = {
  task: emptyTask,
  code: '',
  commands: [],
};


function createTaskEnvironment(taskEnvironments, taskEnvironmentId) {
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
  return { ...taskEnvironment, task, code: '', commands: [] };
}


function changeCode(taskEnvironment, { code }) {
  return { ...taskEnvironment, code };
}


function executeCommand(taskEnvironment, { command }) {
  const updatedCommands = [...taskEnvironment.commands, command];
  const updatedTaskEnvironment = { ...taskEnvironment, commands: updatedCommands };
  return updatedTaskEnvironment;
}


function resetGame(taskEnvironment) {
  return { ...taskEnvironment, commands: [] };
}


export default reduceTaskEnvironments;
