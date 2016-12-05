import { SET_TASK, EXECUTE_COMMAND, CHANGE_CODE, RESET_GAME } from '../actions/taskEnvironment';


function taskEnvironments(state={}, action) {
  switch (action.type) {
    case SET_TASK:
      return updateTaskEnvironment(state, setTask, action.payload);
    case EXECUTE_COMMAND:
      return updateTaskEnvironment(state, executeCommand, action.payload);
    case RESET_GAME:
      return updateTaskEnvironment(state, resetGame, action.payload);
    case CHANGE_CODE:
      return updateTaskEnvironment(state, changeCode, action.payload);
    default:
      return state;
  }
}


const emptyTask = {
  settings: {
    fields: [[]],
  },
};

const initialTaskEnvironment = {
  task: emptyTask,
  code: '',
  commands: [],
};


function updateTaskEnvironment(taskEnvironments, updateFn, args) {
  return updateEntity(taskEnvironments, args.taskEnvironmentId, updateFn, args);
}


function updateEntity(entities, id, updateFn, args) {
  const oldEntity = (id in entities) ? entities[id] : initialTaskEnvironment;
  const updatedEntity =  updateFn(oldEntity, args);
  return Object.assign({}, taskEnvironments, {
    [id]: updatedEntity
  });
}


function setTask(taskEnvironment, { task }) {
  return Object.assign({}, taskEnvironment, { task });
}


function changeCode(taskEnvironment, { code }) {
  return Object.assign({}, taskEnvironment, { code });
}


function executeCommand(taskEnvironment, { command }) {
  const updatedCommands = [...taskEnvironment.commands, command];
  const updatedTaskEnvironment = Object.assign({}, taskEnvironment, {
    commands: updatedCommands
  });
  return updatedTaskEnvironment;
}


function resetGame(taskEnvironment) {
  return Object.assign({}, taskEnvironment, { commands: [] });
}


export default taskEnvironments;
