import { combineReducers } from 'redux';
import reduceTaskEnvironments from './taskEnvironments';
import reduceTaskEditor from './taskEditor';
import { reduceInstructions, reduceInstructionLayer } from './instructions';

export const flocsComponentsReducer = combineReducers({
  taskEnvironments: reduceTaskEnvironments,
  taskEditor: reduceTaskEditor,
  instructions: reduceInstructions,
  instructionLayer: reduceInstructionLayer,
});


export default flocsComponentsReducer;
