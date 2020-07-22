import UIActionTypes from './ui.types';

const INITIAL_STATE = {
  isSidebarOpen: false
};

const UIReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UIActionTypes.TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen
      };
    case UIActionTypes.OPEN_SIDEBAR:
      return {
        ...state,
        isSidebarOpen: true
      };
    default:
      return state;
  }
};

export default UIReducer;
