export function generateRoboJavaScript(roboAst) {
  // TODO: enable to highlight lines(/blocks)
  const { head, body } = roboAst;
  if (head !== 'start') {
    throw new Error(`Unexpected root of roboAst: ${head}`);
  }
  const jsCode = generateSequence(body);
  return jsCode;
}


function generateSequence(nodes) {
  if (nodes === undefined || nodes === null || nodes.length === 0) {
    throw new Error('Cannot generate empty sequence');
  }
  const lines = nodes.map(generateStatement);
  const jsCode = lines.join('\n');
  return jsCode;
}


function generateStatement({ statement }) {
  switch (statement.head) {
    case 'repeat':
      return generateRepeatLoop(statement);
    case 'while':
      return generateWhileLoop(statement);
    case 'if':
      return generateIfStatement(statement);
    default:
      return generateSimpleStatement(statement);
  }
}

function generateSimpleStatement({ head }) {
  // const argsList = args.map(encodeValue).join(',');
  return `${head}()`;
}


function generateRepeatLoop({ count, body }) {
  const bodyCode = generateSequence(body);
  return `for (var i=0; i<${count}; i++) {\n${bodyCode}\n}`;
}


function generateWhileLoop({ test, body }) {
  const testCode = generateTest(test);
  const bodyCode = generateSequence(body);
  return `while ${testCode} {\n${bodyCode}\n}`;
}


function generateIfStatement({ test, body, orelse }) {
  const testCode = generateTest(test);
  const bodyCode = generateSequence(body);
  const orelseCode = orelse ? generateOrelseBlock(orelse) : '';
  // TODO: strip left whitespace
  const code = `\
    if ${testCode} {
      ${bodyCode}
    } ${orelseCode}`;
  return code;
}


function generateOrelseBlock({ statement }) {
  switch (statement.head) {
    case 'elif':
      return generateElif(statement);
    case 'else':
      return generateElse(statement);
    default:
      throw new Error(`Unexpected orelse head: ${statement.head}`);
  }
}


function generateElif({ test, body, orelse }) {
  const testCode = generateTest(test);
  const bodyCode = generateSequence(body);
  const orelseCode = orelse ? generateOrelseBlock(orelse) : '';
  const code = `
    else if ${testCode} {
      ${bodyCode}
    } ${orelseCode}`;
  return code;
}


function generateElse({ body }) {
  const bodyCode = generateSequence(body);
  const code = `
    else {
      ${bodyCode}
    }`;
  return code;
}


function generateTest(node) {
  switch (node.head) {
    case 'and':
      return generateCompoundTest('&&', node.left, node.right);
    case 'or':
      return generateCompoundTest('||', node.left, node.right);
    default:
      return generateSimpleTest(node);
  }
}


function generateCompoundTest(operator, leftTestNode, rightTestNode) {
  const leftTest = generateSimpleTest(leftTestNode);
  const rightTest = generateSimpleTest(rightTestNode);
  return `(${leftTest} ${operator} ${rightTest})`;
}


function generateSimpleTest({ head, comparator, value }) {
  return `(${head}() ${comparator} ${generateValue(value)})`;
}


function generateValue(value) {
  if (typeof value === 'string') {
    return `"${value}"`;
  }
  return value;
}

