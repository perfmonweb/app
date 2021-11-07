import { SET_FOLDERS, SET_PATH } from '../../actions/types';

const INITIAL_STATE = {
  folders: [],
  selectedPath: 'Google',
};

const directoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_FOLDERS:
      return { ...state, folders: action.payload };
    case SET_PATH:
      return {
        ...state,
        selectedPath: state.selectedPath + '/' + action.payload + '/Items',
      };
    default:
      return state;
  }
};

export default directoryReducer;
