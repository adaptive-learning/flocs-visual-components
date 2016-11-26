import { CHANGE_CODE } from '../actions/taskSessions';


function taskSessions(state={}, action) {
  // fake reducer
  const gameState= {
    fields: [[["b", []], ["b", ["A"]], ["b", ["M"]], ["b", ["A"]], ["b", []]], [["k", []], ["k", ["A"]], ["k", []], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", ["M"]], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", []], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", ["M"]], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", []], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", ["M"]], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", []], ["k", ["A"]], ["k", []]], [["k", []], ["k", ["A"]], ["k", ["S"]], ["k", ["A"]], ["k", []]]],
    stage: 'initial'
  };
  const code = 'move()';
  const fakeState = { single: { gameState, code } };

  switch (action.type) {
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


export default taskSessions;
