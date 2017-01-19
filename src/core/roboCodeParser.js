import pegRoboCodeParser from './pegRoboCodeParser';

export function parseRoboCode(code) {
  const normalizedCode = preprocess(code);
  const roboAst = pegRoboCodeParser.parse(normalizedCode);
  return roboAst;
}

function preprocess(code) {
  const lines = removeEmpty(toNumberedIndentedLines(code));
  const linesAndIndents = addIndentationTokens(lines);
  const normalizedLines = linesAndIndents.map(line => {
    switch (line) {
      case 'INDENT':
        return '>';
      case 'DEDENT':
        return '<';
      default:
        return `${line.number}| ${line.text}`;
    }
  });
  const normalizedCode = normalizedLines.join('\n');
  return normalizedCode;
}

function addIndentationTokens(lines) {
  const levels = [0];
  const linesAndIndents = [];
  for (const line of lines) {
    if (line.indentation > levels[levels.length - 1]) {
      linesAndIndents.push('INDENT');
      levels.push(line.indentation);
    }
    while (line.indentation < levels[levels.length - 1]) {
      linesAndIndents.push('DEDENT');
      levels.pop();
    }
    linesAndIndents.push(line);
  }
  while (levels.length > 1) {
    linesAndIndents.push('DEDENT');
    levels.pop();
  }
  return linesAndIndents;
}

function toNumberedIndentedLines(code) {
  const lines = code.split(/\n/);
  const numberedIndentedLines = lines.map((line, index) => {
    const number = index + 1;
    const indentation = line.search(/\S|$/);
    const text = line.trim();
    return { number, indentation, text };
  });
  return numberedIndentedLines;
}


function removeEmpty(numberedIndentedLines) {
  return numberedIndentedLines.filter(line => line.text.length > 0);
}

export default parseRoboCode;
