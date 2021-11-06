export const setDeviceStatus = (state, deviceStatusString) => {
  const devicesListString = deviceStatusString[1].split('\n')[1];
  const ipAndStatus = devicesListString.split('\t');
  const status = ipAndStatus[1] === undefined ? '' : ipAndStatus[1];
  return { ...state, ip_address: ipAndStatus[0], status: status };
};

export const setDeviceProps = (state, deviceProps) => ({
  ...state,
  deviceProps: deviceProps[0],
});

export const setCheckedValue = (state, mod, value) => {
  return { ...state, [mod]: value };
};

export const getAverageFPS = (values) => {
  let x = values.length
    ? values.reduce((acc, fps) => acc + parseInt(fps.value), 0) / values.length
    : 0;
  return x.toFixed(2);
};

export const getAverageAppUsage = (values) => {
  let x = values.length
    ? values.reduce((acc, metric) => acc + parseInt(metric.app), 0) /
      values.length
    : 0;
  return x.toFixed(2);
};

export const getAverageDeviceUsage = (values) => {
  let x = values.length
    ? values.reduce((acc, metric) => acc + parseInt(metric.device), 0) /
      values.length
    : 0;
  return x.toFixed(2);
};
