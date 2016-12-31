export function parseRoboCode(text) {
  const lines = textToNonemptyIndentedLines(text);
  const program = parseNonemptyIndentedLines(lines);
  return program;
}


function textToNonemptyIndentedLines(text) {
  const lines = text.split(/\n/);
  const indentedLines = lines.map((line) => {
    const spacesCount = line.search(/\S|$/);
    return [spacesCount, line.trim()];
  });
  const nonemptyIndentedLines = indentedLines.filter(indLine => indLine[1].length > 0);
  return nonemptyIndentedLines;
}


function parseNonemptyIndentedLines(lines) {
  const nestedLines = nestIndentedLines(lines);
  const program = parseSequence(nestedLines);
  return program;
}


function parseSequence(nestedLines) {
  return nestedLines.map(parseCommand);
}


function parseCommand({ head, body }) {
  if (head.startsWith('move')) {
    // TODO: force empty body
    return parseMove(head);
  } else if (head.startsWith('while')) {
    return ['while', parseCondition(head.slice(6)), parseSequence(body)];
  } else if (head.startsWith('repeat')) {
    return ['repeat', parseNumber(head.slice(6)), parseSequence(body)];
  } else if (head.startsWith('if')) {
    return ['if', parseCondition(head.slice(3)), parseSequence(body)];
  }
  throw new Error(`Uknown command: ${head}`);
}


function parseNumber(text) {
  const numberRe = /(\d+)/;
  const match = numberRe.exec(text);
  const number = parseInt(match[1], 10);
  return number;
}


function parseMove(line) {
  const moveCmdRe = /^move\((['"](.*)['"])?\)$/;
  const match = moveCmdRe.exec(line);
  const direction = match[2] || 'ahead';
  return ['move', direction];
}


function parseCondition(line) {
  // TODO: allow for nested conditions
  // return alternatives(simpleCondition, andCondition, orCondition)(line);
  if (line.indexOf(' and ') >= 0) {
    return parseAndCondition(line);
  }
  if (line.indexOf(' or ') >= 0) {
    return parseOrCondition(line);
  }
  return parseSimpleCondition(line);
}


function parseSimpleCondition(text) {
  const tokens = tokenize(text);
  const conditionParser = {
    color: parseColorCondition,
    position: parsePositionCondition,
  }[tokens[0]];
  const condition = conditionParser(tokens);
  return condition;
}


function tokenize(line) {
  const tokens = line.split(/[ ()'"]+/);
  return tokens;
}


function parseColorCondition(tokens) {
  const op = tokens[1];
  const color = tokens[2];
  // TODO: checks and error reports
  return ['color', op, color];
}


function parsePositionCondition(tokens) {
  const op = tokens[1];
  const position = parseInt(tokens[2], 10);
  // TODO: checks and error reports
  return ['position', op, position];
}


function parseAndCondition(text) {
  const parts = text.split(' and ');
  return ['and', parseSimpleCondition(parts[0]), parseSimpleCondition(parts[1])];
}


function parseOrCondition(text) {
  const parts = text.split(' or ');
  return ['or', parseSimpleCondition(parts[0]), parseSimpleCondition(parts[1])];
}


function nestIndentedLines(lines) {
  const nestedLines = [];
  const openSequences = [nestedLines];
  for (const [indentation, line] of lines) {
    if (indentation % 4 !== 0) {
      throw new Error('Expects indentation to be multiple of 4.');
    }
    const level = indentation / 4;
    if (level <= openSequences.length) {
      openSequences.length = level + 1;
      const newNode = { head: line, body: [] };
      openSequences[level].push(newNode);
      openSequences.push(newNode.body);
    } else {
      throw new Error(`Unexpectedly large indentation ${indentation}`);
    }
  }
  return nestedLines;
}


export default parseRoboCode;
