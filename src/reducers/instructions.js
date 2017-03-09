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
        scheduledInstructions: ['space-world', 'controls'],
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
      position: 'bottom-left',
    },
    'controls': {
      instructionId: 'controls',
      selector: '.instructionable-controls',
      position: 'bottom-left',
    },
  };
}
