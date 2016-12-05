export function getTaskEnvironment(state, taskEnvironmentId) {
  return state.flocsComponents.taskEnvironments[taskEnvironmentId];
}


export function getTask(state, taskEnvironmentId) {
  return getTaskEnvironment(state, taskEnvironmentId).task;
}


export function getCode(state, taskEnvironmentId) {
  return getTaskEnvironment(state, taskEnvironmentId).code;
}


export function getInitialFieldsFromTaskEnvironment(taskEnvironment) {
  return taskEnvironment.task.setting.fields;
}
