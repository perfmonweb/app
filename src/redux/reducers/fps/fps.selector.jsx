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

export const selectFPSValues = createSelector(
  [fpsState],
  (state) => state.fpsValues
);

export const selectCurrentFPS = createSelector([selectFPSValues], (arr) =>
  arr ? arr.at(-1) : { value: 0, duration: 0 }
);

export const selectCPUValues = createSelector(
  [fpsState],
  (state) => state.cpuValues
);

export const selectCurrentCPU = createSelector([selectCPUValues], (arr) =>
  arr ? arr.at(-1) : { app: 0, device: 0, duration: 0 }
);

export const selectMEMValues = createSelector(
  [fpsState],
  (state) => state.memValues
);

export const selectCurrentMEM = createSelector([selectMEMValues], (arr) =>
  arr ? arr.at(-1) : { app: 0, device: 0, duration: 0 }
);

export const selectisFPSChecked = createSelector(
  [fpsState],
  (fps) => fps.fpsChecked
);

export const selectisCPUChecked = createSelector(
  [fpsState],
  (cpu) => cpu.cpuChecked
);

export const selectisMEMChecked = createSelector(
  [fpsState],
  (mem) => mem.memChecked
);

export const selectSession = createSelector(
  [fpsState],
  (state) => state.session
);
