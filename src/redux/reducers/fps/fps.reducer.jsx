import {
  SET_DEVICE,
  SET_DEVICE_PROP,
  SET_ERROR,
  SET_PACKAGE_NAME,
  TOGGLE_RECORDING,
} from '../../actions/types';
import { setDeviceProps, setDeviceStatus } from './fps.utils';

const INITIAL_STATE = {
  ip_address: '',
  status: '',
  package: '',
  error: '',
  isRecording: false,
  deviceProps: {},
};

const fpsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_DEVICE:
      return setDeviceStatus(state, action.payload);
    case SET_PACKAGE_NAME:
      return { ...state, package: action.payload };
    case SET_DEVICE_PROP:
      return setDeviceProps(state, action.payload);
    case TOGGLE_RECORDING:
      return { ...state, isRecording: !state.isRecording };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default fpsReducer;
