import { Interpreter } from 'js-interpreter';
import { parseRoboCode } from './roboCodeParser';
import { generateRoboJavaScript } from './roboJavaScriptGenerator';

const defaultSettings = {
  pauseLength: 500,
};


/**
 * Interpret given robo-code step by step.
 *
 * Input and output is given by :context: parameter, it must provide
 * all robo-commands (doActionMove, position, color)
 * and it can optionally provide some other hooks (isSolved, isDead, interrupted).
 *
 * Return a promise which will be fullfilled when the interpretting is finished
 */
export function interpretRoboCode(code, context, settings = defaultSettings) {
  const roboAst = parseRoboCode(code);
  const jsCode = generateRoboJavaScript(roboAst);
  const interpretingFinishedPromise = steppingJsCode(jsCode, context, settings.pauseLength);
  return interpretingFinishedPromise;
}


function steppingJsCode(jsCode, context, pauseLength) {
  let pause = false;

  function initApi(interpreter, scope) {
    // TODO: dry initApi function
    const actions = ['fly', 'left', 'right', 'shoot'];
    actions.forEach((action) => {
      interpreter.setProperty(scope, action,
        interpreter.createNativeFunction(() => {
          context.doActionMove(action);
          pause = true;
          return interpreter.createPrimitive();
        })
      );
    });

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
    if (context.interrupted()) {
      resolve('interrupted');
    } else if (context.isSolved()) {
      finalize(resolve, 'solved');
    } else if (context.isDead()) {
      finalize(resolve, 'dead');
    } else if (!next) {
      finalize(resolve, 'last step');
    } else {
      pause = false;
      setTimeout(() => nextSteps(resolve, reject), pauseLength);
    }
  }

  function finalize(resolve, reason) {
    setTimeout(() => {
      // context.finalize();
      resolve(reason);
    }, pauseLength);
  }

  return new Promise(nextSteps);
}


export default interpretRoboCode;
