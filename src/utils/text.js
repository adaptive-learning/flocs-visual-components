/**
 * String template tag removing leading indentation
 */
export function stripIndentation(strings, ...values) {
  const trimmedStrings = strings.map(string =>
    string.split('\n').map(line => line.trim()).join('\n'));
  const text = trimmedStrings.reduce((acc, string, i) => acc + values[i - 1] + string);
  return text;
}
