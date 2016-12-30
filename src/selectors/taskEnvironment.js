import { generateSettingText } from '../core/taskSetting';
import { stripIndentation } from '../utils/text';

export function getTaskEnvironment(state, taskEnvironmentId) {
  return state.flocsComponents.taskEnvironments[taskEnvironmentId];
}


export function getTask(state, taskEnvironmentId) {
  return getTaskEnvironment(state, taskEnvironmentId).task;
}


export function getTaskSourceText(state, taskEnvironmentId) {
  if (!isSettingTextValid(state, taskEnvironmentId)) {
    throw Error('Invalid task setting');
  }
  const setting = getSettingText(state, taskEnvironmentId);
  const solution = getCode(state, taskEnvironmentId);

  const sourceText = stripIndentation`\
    Setting
    -------

    \`\`\`
    ${setting}
    \`\`\`

    Solution
    --------

    \`\`\`python
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
  const settingText = generateSettingText(setting);
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
