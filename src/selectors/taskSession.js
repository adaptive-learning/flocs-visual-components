export function getTaskSession(state, taskSessionId) {
  return state.flocsComponents.taskSessions[taskSessionId];
}


export function getCode(state, taskSessionId) {
  const taskSession = getTaskSession(state, taskSessionId);
  return taskSession.code;
}
