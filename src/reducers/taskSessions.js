import { EXECUTE_COMMAND, CHANGE_CODE, RESET_GAME } from '../actions/taskSessions';


function taskSessions(state={}, action) {
  // fake reducer
  const setting = {
    fields: [[["b", []], ["b", ["A"]], ["b", ["M"]], ["b", ["A"]], ["b", []]], [["k", []], ["k", ["A"]], ["k", []], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", ["M"]], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", []], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", ["M"]], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", []], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", ["M"]], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", []], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", ["S"]], ["k", ["A"]], ["k", []]]],
  };
  const code = '';
  const commands = [];
  const fakeState = { single: { code, setting, commands } };

  switch (action.type) {
    case EXECUTE_COMMAND:
      return updateTaskSession(state, executeCommand, action.payload);
    case RESET_GAME:
      return updateTaskSession(state, resetGame, action.payload);
    case CHANGE_CODE:
      return updateTaskSession(state, changeCode, action.payload);
    default:
      return fakeState;
  }
}


function updateTaskSession(taskSessions, updateFn, args) {
  return updateEntity(taskSessions, args.taskSessionId, updateFn, args);
}


function updateEntity(entities, id, updateFn, args) {
  const updatedEntity =  updateFn(entities[id], args);
  return Object.assign({}, taskSessions, {
    [id]: updatedEntity
  });
}


function changeCode(taskSession, { code }) {
  return Object.assign({}, taskSession, { code });
}


function executeCommand(taskSession, { command }) {
  const updatedCommands = [...taskSession.commands, command];
  const updatedTaskSession = Object.assign({}, taskSession, {
    commands: updatedCommands
  });
  return updatedTaskSession;
}


function resetGame(taskSession) {
  return Object.assign({}, taskSession, { commands: [] });
}


export default taskSessions;
