//import { Interpreter } from 'js-interpreter/interpreter';
import { Interpreter } from 'js-interpreter';
import { parseRoboCode } from './parser'


const defaultSettings = {
  pauseLength: 500,
}


export function interpretRoboCode(code, settings=defaultSettings) {
  const roboAst = parseRoboCode(code);
  const jsCode = roboAstToJS(roboAst);
  stepJsCode(jsCode, settings.pauseLength);
}


function roboAstToJS(roboAst) {
  // TODO: enable to highlight lines(/blocks)
  const jsCode = generateSequence(roboAst);
  return jsCode;
}


function generateSequence(nodes) {
  const lines = nodes.map(generateStatement);
  const jsCode = lines.join('\n');
  return jsCode;
}


function generateStatement(node) {
  const head = node[0];
  switch (head) {
    case 'move':
      return generateCommand(node);
    case 'repeat':
      return generateRepeatLoop(node);
    case 'while':
      return generateWhileLoop(node);
    case 'if':
      return generateIfStatement(node);
    default:
      throw `Unknown node head in roboAST <${head}> in node <${node}> for statement`
  };
}

function generateCommand(node) {
  const [command, ...args] = node;
  const argsList = args.map(encodeValue).join(',');
  return `${command}(${argsList})`;
}


function generateRepeatLoop(node) {
  const [_, count, body] = node;
  const bodyCode = generateSequence(body);
  return `for (var i=0; i<${count}; i++) {\n${bodyCode}\n}`;
}


function generateWhileLoop(node) {
  const [_, condition, body] = node;
  const conditionCode = generateCondition(condition);
  const bodyCode = generateSequence(body);
  return `while ${conditionCode} {\n${bodyCode}\n}`;
}


function generateIfStatement(node) {
  const [_, condition, body] = node;
  const conditionCode = generateCondition(condition);
  const bodyCode = generateSequence(body);
  return `if ${conditionCode} {\n${bodyCode}\n}`;
}


function generateCondition(node) {
  const head = node[0];
  switch (head) {
    case 'color':
    case 'position':
      return generateSimpleCondition(node);
    case 'and':
      return generateComplexCondition('&&', node[1], node[2]);
    case 'or':
      return generateComplexCondition('||', node[1], node[2]);
    default:
      throw `Unknown node head in roboAST <${head}> in node <${node}> for condition`
  };
}


function generateSimpleCondition(node) {
  const [fnName, comparator, value] = node;
  return `(${fnName}() ${comparator} ${encodeValue(value)})`;
}


function generateComplexCondition(operator, leftConditionNode, rightConditionNode) {
  const leftCondition = generateSimpleCondition(leftConditionNode);
  const rightCondition = generateSimpleCondition(rightConditionNode);
  return `(${leftCondition} ${operator} ${rightCondition})`;
}


function encodeValue(arg) {
  if (typeof arg == 'string') {
    return `"${arg}"`;
  } else {
    return arg;
  };
}


function stepJsCode(jsCode, delay) {
  const jsInterpreter = new Interpreter(jsCode);
  console.log('interpreter prepared:', jsInterpreter);
  /*const jsInterpreter = new Interpreter(jsCode, initApi);

  let pause = false;
  function nextStep() {
    let ok = true;
    while (ok && !pause) {
      ok = jsInterpreter.step();
    }
    if (ok) {
      pause = false;
      window.setTimeout(nextStep, PAUSE_LENGTH);
    }
  }
  nextStep();*/
}
