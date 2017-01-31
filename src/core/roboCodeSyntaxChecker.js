export function getSyntaxCheckInfo(roboAst) {
  const errors = [];
  const nodes = getAllNodes(roboAst);
  for (const node of nodes) {
    if (node.head === 'if' || node.head === 'while') {
      if (node.test == null) {
        const error = { message: `Missing test in ${node.head} block` };
        errors.push(error);
      }
    }
    if (node.head === 'while') {
      if (countActions(node) === 0) {
        const error = { message: 'While loop without any action' };
        errors.push(error);
      }
    }
  }
  const valid = errors.length === 0;
  return { valid, errors };
}


export function countActions(roboAst) {
  const nodes = getAllNodes(roboAst);
  // TODO: use in-set instead of 4 comparisions
  const actionNodes = nodes.filter(node => node.head === 'fly'
                                   || node.head === 'left'
                                   || node.head === 'right'
                                   || node.head === 'shoot');
  const count = actionNodes.length;
  return count;
}


function getAllNodes(astNode) {
  // quick traversing hack -> fragile code -> TODO: do it properly
  // TODO: also traverse through non-commands (ie. test)
  if (astNode.statement) {
    return getAllNodes(astNode.statement);
  }
  let nodes = [astNode];
  if (astNode.body) {
    nodes = [].concat.apply(nodes, astNode.body.map(getAllNodes));
  }
  if (astNode.orelse) {
    nodes = nodes.concat(getAllNodes(astNode.orelse));
  }
  return nodes;
}
