import { countActions } from '../core/roboCodeSyntaxChecker';
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
  const roboAst = getRoboAst(state, taskEnvironmentId);
  const used = countActions(roboAst);
  return { used, limit };
}


export function getTaskSourceText(state, taskEnvironmentId) {
  if (!isSpaceWorldTextValid(state, taskEnvironmentId)) {
    throw Error('Invalid task setting');
  }
  const { taskId, category, setting } = getTask(state, taskEnvironmentId);
  const { energy, actionsLimit } = setting;
  const spaceWorldText = getSpaceWorldText(state, taskEnvironmentId);
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


export function getSpaceWorldText(state, taskEnvironmentId) {
  if (!isSpaceWorldTextValid(state, taskEnvironmentId)) {
    const invalidSpaceWorldText = getInvalidSpaceWorldText(state, taskEnvironmentId);
    return invalidSpaceWorldText;
  }
  const setting = getSetting(state, taskEnvironmentId);
  const spaceWorldText = generateSpaceWorldText(setting.fields);
  return spaceWorldText;
}


export function getInvalidSpaceWorldText(state, taskEnvironmentId) {
  const { invalidSpaceWorldText } = getTaskEnvironment(state, taskEnvironmentId);
  if (invalidSpaceWorldText === undefined) {
    return null;
  }
  return invalidSpaceWorldText;
}


export function isSpaceWorldTextValid(state, taskEnvironmentId) {
  const { invalidSpaceWorldText } = getTaskEnvironment(state, taskEnvironmentId);
  const isValid = (invalidSpaceWorldText == null);
  return isValid;
}


export function getCode(state, taskEnvironmentId) {
  const taskEnvironment = getTaskEnvironment(state, taskEnvironmentId);
  return taskEnvironment.code;
}


export function getRoboAst(state, taskEnvironmentId) {
  const taskEnvironment = getTaskEnvironment(state, taskEnvironmentId);
  return taskEnvironment.roboAst;
}


export function getEditorType(state, taskEnvironmentId) {
  const taskEnvironment = getTaskEnvironment(state, taskEnvironmentId);
  const editorType = taskEnvironment.editorType;
  return editorType;
}


// FIXME: not a selector function, should be somewhere else
export function getInitialFieldsFromTaskEnvironment(taskEnvironment) {
  return taskEnvironment.task.setting.fields;
}
