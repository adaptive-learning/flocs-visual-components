import Blockly from 'node-blockly/browser';
import blocks from './blocks';

export function initGlobalBlockly() {
  global.Blockly = Blockly;
  initBlocks(blocks);
}


function initBlocks(allBlocks) {
  allBlocks.forEach(block => {
    Blockly.Blocks[block.id] = {
      init: initBlock(block),
    };
  });
}


function initBlock(block) {
  return function init() {
    this.jsonInit(block);
  };
}


export function blocklyXmlToRoboAst(blocklyXml) {
  const blocklyDom = Blockly.Xml.textToDom(blocklyXml);
  // console.log('new blocklyDom:', blocklyDom);
  const roboAst = blocklyDomToRoboAst(blocklyDom);
  return roboAst;
}


function blocklyDomToRoboAst(node) {
  return { head: 'start', body: getBody(node), location: getLocation(node) };
}


function getBody(node) {
  const body = [];
  let next = node.getElementsByTagName('next')[0];
  while (next !== undefined) {
    body.push(statementNodeToAst(node));
    next = next.getElementsByTagName('next')[0];
  }
  return body;
}


function statementNodeToAst(node) {
  // TODO: implement
  const statement = 's';
  return { statement, location: getLocation(node) };
}


function getLocation(node) {
  return { blockId: node.id };
}
