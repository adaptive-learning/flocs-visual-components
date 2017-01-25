import pegTaskSourceParser from './pegTaskSourceParser';

/**
 * Parse task source text (markdown) and returned js object representing the
 * task
 */
export function parseTaskSourceText(sourceText) {
  const task = pegTaskSourceParser.parse(sourceText);
  // TODO: parse robocode and spaceworld
  console.log('parsed:', task);
  return task;
}
