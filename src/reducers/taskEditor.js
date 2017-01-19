import { flocsActions as actions } from '../actions';

const initialState = {
  vimMode: false,
};

export default function reduceTaskEditor(state = initialState, action) {
  switch (action.type) {
    case actions.SWITCH_VIM_MODE:
      return { ...state, vimMode: !state.vimMode };
    default:
      return state;
  }
}
