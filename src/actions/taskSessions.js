export const CLICK_CONTROL = 'CLICK_CONTROL';
export function controlClicked(taskSessionId, control) {
  return {
    type: CLICK_CONTROL,
    payload: { taskSessionId, control }
  };
};


export const CHANGE_CODE = 'CHANGE_CODE';
export function changeCode(taskSessionId, code) {
  return {
    type: CHANGE_CODE,
    payload: { taskSessionId, code }
  };
};


