import { combineReducers } from 'redux';
import taskSessions from './taskSessions'

const flocsComponentsReducer = combineReducers({
  taskSessions,
});


export { flocsComponentsReducer };
