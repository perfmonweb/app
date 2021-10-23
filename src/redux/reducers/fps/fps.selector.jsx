import { createSelector } from 'reselect';
const fpsState = (state) => state.fps;

export const selectIp = createSelector([fpsState], (state) => state.ip_address);
export const selectStatus = createSelector([fpsState], (state) => state.status);
export const selectPackage = createSelector(
  [fpsState],
  (state) => state.package
);

export const selectDeviceProp = createSelector(
  [fpsState],
  (state) => state.deviceProps
);

export const selectDeviceName = createSelector([selectDeviceProp], (prop) =>
  String(prop.device_model).replace(/[[\]']+/g, '')
);

export const selectDevicePlatform = createSelector([selectDeviceProp], (prop) =>
  String(prop.id).replace(/[[\]']+/g, '')
);

export const selectDeviceBoard = createSelector([selectDeviceProp], (prop) =>
  String(prop.board).replace(/[[\]']+/g, '')
);

export const selectIsRecording = createSelector(
  [fpsState],
  (state) => state.isRecording
);

export const selectError = createSelector([fpsState], (state) => state.error);
