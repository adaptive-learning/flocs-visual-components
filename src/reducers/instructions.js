import { SHOW_INSTRUCTIONS } from '../actionTypes';


const initialState = {
  activeInstruction: null,
  scheduledInstructions: [],
};


export function reduceInstructionLayer(state = initialState, action) {
  switch (action.type) {
    case SHOW_INSTRUCTIONS:
      return {
        ...state,
        activeInstruction: 'space-world',
        scheduledInstructions: [
          // 'space-world',
          // 'controls',
          // 'energy-status',
          // 'action-limit',
          'object.asteroid',
          'object.meteoroid',
          'object.diamond',
          'diamonds-status',
          'object.wormhole',
        ],
      };
    default:
      return state;
  }
}


export function reduceInstructions() {
  return {
    'space-world': {
      instructionId: 'space-world',
      selector: '.instructionable-space-world',
      position: 'bottom',
    },
    'controls': {
      instructionId: 'controls',
      selector: '.instructionable-controls',
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
  };
}
