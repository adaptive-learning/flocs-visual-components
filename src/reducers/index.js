import { combineReducers } from 'redux';
import taskEnvironments from './taskEnvironments'

const flocsComponentsReducer = combineReducers({
  taskEnvironments,
});


export { flocsComponentsReducer };
