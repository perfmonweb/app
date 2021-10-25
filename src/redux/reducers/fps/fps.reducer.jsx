import {
  SET_DEVICE,
  SET_DEVICE_PROP,
  SET_ERROR,
  SET_PACKAGE_NAME,
  TOGGLE_RECORDING,
  SET_FPS,
  SET_CPU,
  SET_MEM,
  SET_CHECKED,
} from '../../actions/types';
import { setCheckedValue, setDeviceProps, setDeviceStatus } from './fps.utils';

const INITIAL_STATE = {
  ip_address: '',
  status: '',
  package: '',
  error: '',
  fpsValues: [],
  cpuValues: [],
  memValues: [],
  isRecording: false,
  deviceProps: {},
  fpsChecked: true,
  cpuChecked: true,
  memChecked: true,
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
      return { ...state, isRecording: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case SET_FPS:
      return { ...state, fpsValues: [...state.fpsValues, action.payload] };
    case SET_CPU:
      return { ...state, cpuValues: [...state.cpuValues, action.payload] };
    case SET_MEM:
      return { ...state, memValues: [...state.memValues, action.payload] };
    case SET_CHECKED:
      return setCheckedValue(state, action.mod, action.val);
    default:
      return state;
  }
};

export default fpsReducer;
