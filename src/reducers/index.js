import { combineReducers } from 'redux';
import reduceTaskEnvironments from './taskEnvironments';
import reduceTaskEditor from './taskEditor';
import { reduceInstructions, reduceInstructionLayer } from './instructions';
import { reduceStudent } from './student';

export const flocsComponentsReducer = combineReducers({
  student: reduceStudent,
  taskEnvironments: reduceTaskEnvironments,
  taskEditor: reduceTaskEditor,
  instructions: reduceInstructions,
  instructionLayer: reduceInstructionLayer,
});


export default flocsComponentsReducer;
