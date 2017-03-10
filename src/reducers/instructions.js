import { SHOW_INSTRUCTIONS } from '../actionTypes';


const initialState = {
  activeInstruction: null,
  scheduledInstructions: [],
  ordering: [
    'env.space-world',
    'env.toolbox',
    'env.snapping',
    'env.controls',
    'object.asteroid',
    'object.meteoroid',
    'object.diamond',
    'object.wormhole',
    'diamonds-status',
    'energy-status',
    'action-limit',
    'block.fly',
    'block.shoot',
    'block.repeat',
    'block.while',
    'block.color',
    'block.position',
    'block.if',
    'block.if-else',
  ],
};


export function reduceInstructionLayer(state = initialState, action) {
  switch (action.type) {
    case SHOW_INSTRUCTIONS:
      return {
        ...state,
        activeInstruction: 'space-world',
        scheduledInstructions: state.ordering,  // for testing
      };
    default:
      return state;
  }
}


export function reduceInstructions() {
  return {
    'env.space-world': {
      instructionId: 'env.space-world',
      selector: '.instructionable-env-space-world',
      position: 'bottom',
    },
    'env.toolbox': {
      instructionId: 'env.toolbox',
      selector: '.blocklyFlyout',
      position: 'right',
    },
    'env.snapping': {
      instructionId: 'env.snapping',
      selector: '.instructionable-env-snapping',
      position: 'bottom-left',
    },
    'env.controls': {
      instructionId: 'env.controls',
      selector: '.instructionable-env-controls',
      position: 'bottom-left',
    },
    'object.wormhole': {
      instructionId: 'object.wormhole',
      selector: '.instructionable-object-wormhole',
      position: 'bottom-left',
    },
    'object.diamond': {
      instructionId: 'object.diamond',
      selector: '.instructionable-object-diamond',
      position: 'bottom-left',
    },
    'object.asteroid': {
      instructionId: 'object.asteroid',
      selector: '.instructionable-object-asteroid',
      position: 'bottom-left',
    },
    'object.meteoroid': {
      instructionId: 'object.meteoroid',
      selector: '.instructionable-object-meteoroid',
      position: 'bottom-left',
    },
    'diamonds-status': {
      instructionId: 'diamonds-status',
      selector: '.instructionable-diamonds-status',
      position: 'bottom-left',
    },
    'energy-status': {
      instructionId: 'energy-status',
      selector: '.instructionable-energy-status',
      position: 'bottom-left',
    },
    'action-limit': {
      instructionId: 'action-limit',
      selector: '.instructionable-action-limit',
      position: 'bottom-left',
    },
    'block.fly': {
      instructionId: 'block.fly',
      selector: '.instructionable-block-fly',
      position: 'bottom-left',
    },
    'block.shoot': {
      instructionId: 'block.shoot',
      selector: '.instructionable-block-shoot',
      position: 'bottom-left',
    },
    'block.repeat': {
      instructionId: 'block.repeat',
      selector: '.instructionable-block-repeat',
      position: 'bottom-left',
    },
    'block.while': {
      instructionId: 'block.while',
      selector: '.instructionable-block-while',
      position: 'bottom-left',
    },
    'block.color': {
      instructionId: 'block.color',
      selector: '.instructionable-block-color',
      position: 'bottom-left',
    },
    'block.position': {
      instructionId: 'block.position',
      selector: '.instructionable-block-position',
      position: 'bottom-left',
    },
    'block.if': {
      instructionId: 'block.if',
      selector: '.instructionable-block-if',
      position: 'bottom-left',
    },
    'block.if-else': {
      instructionId: 'block.if-else',
      selector: '.instructionable-block-if-else',
      position: 'bottom-left',
    },
  };
}
