import { generateSpaceWorldText } from '../core/spaceWorldDescription';
import { stripIndentation } from '../utils/text';

export function getTaskEnvironment(state, taskEnvironmentId) {
  return state.flocsComponents.taskEnvironments[taskEnvironmentId];
}


export function getTask(state, taskEnvironmentId) {
  return getTaskEnvironment(state, taskEnvironmentId).task;
}


export function getTaskId(state, taskEnvironmentId) {
  const task = getTask(state, taskEnvironmentId);
  return task.taskId;
}


export function getActionsLimit(state, taskEnvironmentId) {
  const task = getTask(state, taskEnvironmentId);
  const limit = task.setting.actionsLimit;
  const code = getCode(state, taskEnvironmentId);
  const used = (code.match(/(shoot|fly|left|right)\(\)/g) || []).length;
    // this is cheating (not working e.g. with comments)
    // TODO: do it properly (over roboAST)
  return { used, limit };
}


export function getTaskSourceText(state, taskEnvironmentId) {
  if (!isSettingTextValid(state, taskEnvironmentId)) {
    throw Error('Invalid task setting');
  }
  const { taskId, category, setting } = getTask(state, taskEnvironmentId);
  const { energy, actionsLimit } = setting;
  const spaceWorldText = getSettingText(state, taskEnvironmentId);
  const solution = getCode(state, taskEnvironmentId);

  const sourceText = stripIndentation`\
    # ${taskId}
    ${category !== null ? `- category: ${category}` : ''}

    ## Setting

    \`\`\`
    ${spaceWorldText}
    \`\`\`
    ${energy !== null ? `- energy: ${energy}` : ''}
    ${actionsLimit !== null ? `- actionsLimit: ${actionsLimit}` : ''}

    ## Solution

    \`\`\`
    ${solution}
    \`\`\`
  `;
  return sourceText;
}


export function getSetting(state, taskEnvironmentId) {
  const task = getTask(state, taskEnvironmentId);
  return task.setting;
}


export function getSettingText(state, taskEnvironmentId) {
  if (!isSettingTextValid(state, taskEnvironmentId)) {
    const invalidSettingText = getInvalidSettingText(state, taskEnvironmentId);
    return invalidSettingText;
  }
  const setting = getSetting(state, taskEnvironmentId);
  const settingText = generateSpaceWorldText(setting.fields);
  return settingText;
}


export function getInvalidSettingText(state, taskEnvironmentId) {
  const { invalidSettingText } = getTaskEnvironment(state, taskEnvironmentId);
  if (invalidSettingText === undefined) {
    return null;
  }
  return invalidSettingText;
}


export function isSettingTextValid(state, taskEnvironmentId) {
  const { invalidSettingText } = getTaskEnvironment(state, taskEnvironmentId);
  const isValid = (invalidSettingText == null);
  return isValid;
}


export function getCode(state, taskEnvironmentId) {
  return getTaskEnvironment(state, taskEnvironmentId).code;
}


// FIXME: not a selector function, should be somewhere else
export function getInitialFieldsFromTaskEnvironment(taskEnvironment) {
  return taskEnvironment.task.setting.fields;
}
