import { SHOW_INSTRUCTIONS,
         SEEN_INSTRUCTION } from '../actionTypes';

export function showInstructions() {
  return {
    type: SHOW_INSTRUCTIONS,
    payload: {},
  };
}


export function seenInstruction(index) {
  return {
    type: SEEN_INSTRUCTION,
    payload: { index },
  };
}
