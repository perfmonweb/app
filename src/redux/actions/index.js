import {
  SET_DEVICE,
  SET_DEVICE_PROP,
  SET_ERROR,
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

export const toggleRecording = () => ({
  type: TOGGLE_RECORDING,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});
