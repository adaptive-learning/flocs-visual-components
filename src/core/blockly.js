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

