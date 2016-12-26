import { Interpreter } from 'js-interpreter';
import { parseRoboCode } from './parser';


const defaultSettings = {
  pauseLength: 500,
};


/**
 * Interpret given robo-code step by step.
 *
 * Input and output is given by :context: parameter, it must provide
 * all robo-commands (move, position, color)
 *
 * Return a promise which will be fullfilled when the interpretting is finished
 */
export function interpretRoboCode(code, context, settings = defaultSettings) {
  const roboAst = parseRoboCode(code);
  const jsCode = roboAstToJS(roboAst);
  const interpretingFinishedPromise = steppingJsCode(jsCode, context, settings.pauseLength);
  return interpretingFinishedPromise;
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
      throw new Error(`Unknown node head in roboAST <${head}> in node <${node}> for statement`);
  }
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
      throw new Error(`Unknown node head in roboAST <${head}> in node <${node}> for condition`);
  }
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
  if (typeof arg === 'string') {
    return `"${arg}"`;
  }
  return arg;
}


function steppingJsCode(jsCode, context, pauseLength) {
  let pause = false;

  function initApi(interpreter, scope) {
    // TODO: dry initApi function
    interpreter.setProperty(scope, 'move',
      interpreter.createNativeFunction((directionArg) => {
        const direction = directionArg ? directionArg.toString() : 'ahead';
        context.move(direction);
        pause = true;
        return interpreter.createPrimitive();
      })
    );

    interpreter.setProperty(scope, 'color',
      interpreter.createNativeFunction(() => interpreter.createPrimitive(context.color()))
    );

    interpreter.setProperty(scope, 'position',
      interpreter.createNativeFunction(() => interpreter.createPrimitive(context.position()))
    );
  }

  const jsInterpreter = new Interpreter(jsCode, initApi);

  function nextSteps(resolve, reject) {
    let next = true;
    while (next && !pause && !context.interrupted()) {
      next = jsInterpreter.step();
    }
    if (context.isSolved()) {
      resolve('solved');
    } else if (context.isDead()) {
      resolve('dead');
    } else if (context.interrupted()) {
      resolve('interrupted');
    } else if (!next) {
      resolve('last step');
    } else {
      pause = false;
      setTimeout(() => nextSteps(resolve, reject), pauseLength);
    }
  }

  return new Promise(nextSteps);
}


export default interpretRoboCode;
