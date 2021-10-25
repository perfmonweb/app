import {
  SET_CHECKED,
  SET_CPU,
  SET_DEVICE,
  SET_DEVICE_PROP,
  SET_ERROR,
  SET_FPS,
  SET_MEM,
  SET_PACKAGE_NAME,
  TOGGLE_RECORDING,
} from './types';

export const setDevice = (deviceStatus) => ({
  type: SET_DEVICE,
  payload: deviceStatus,
});

export const setPackageName = (package_name) => ({
  type: SET_PACKAGE_NAME,
  payload: package_name,
});

export const setDeviceProp = (deviceInfo) => ({
  type: SET_DEVICE_PROP,
  payload: deviceInfo,
});

export const toggleRecording = (val) => ({
  type: TOGGLE_RECORDING,
  payload: val,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const setFPS = (val) => ({
  type: SET_FPS,
  payload: val,
});

export const setCPU = (val) => ({
  type: SET_CPU,
  payload: val,
});

export const setMEM = (val) => ({
  type: SET_MEM,
  payload: val,
});

export const setChecked = (mod, value) => ({
  type: SET_CHECKED,
  mod,
  val: value,
});
