import { combineReducers } from 'redux';
import reduceTaskEnvironments from './taskEnvironments';
import reduceTaskEditor from './taskEditor';

export const flocsComponentsReducer = combineReducers({
  taskEnvironments: reduceTaskEnvironments,
  taskEditor: reduceTaskEditor,
});


export default flocsComponentsReducer;
