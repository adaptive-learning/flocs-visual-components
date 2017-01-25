import pegTaskSourceParser from './pegTaskSourceParser';
import { parseRoboCode } from './roboCodeParser';
import { parseSpaceWorld } from './spaceWorldDescription';

/**
 * Parse task source text (markdown) and returned js object representing the
 * task
 */
export function parseTaskSourceText(sourceText) {
  const task = pegTaskSourceParser.parse(sourceText);
  task.setting.fields = parseSpaceWorld(task.setting.fields);
  task.solution = parseRoboCode(task.solution);
  return task;
}
