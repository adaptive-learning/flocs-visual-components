const CONTROL_CLICKED = 'CONTROL_CLICKED';

export function controlClicked(taskSessionId, control) {
  return {
    type: CONTROL_CLICKED,
    payload: { taskSessionId, control }
  };
};
