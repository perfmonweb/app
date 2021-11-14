import React from 'react';
import MetricComponent from '../../metric/metric.component';

const DisplayChart = ({ chartData }) => {
  const CPUValues = chartData['CPUValues'];
  const MEMValues = chartData['MEMValues'];
  const FPSValues = chartData['FPSValues'];
  const deviceProps = chartData['deviceProps'];
  const sessionTime = chartData['sessionTime'];
  return (
    <div>
      <DisplayFPS FPSData={FPSValues} />
      <DisplayCPU CPUData={CPUValues} />
      <DisplayMEM MEMData={MEMValues} />
    </div>
  );
};

const DisplayFPS = ({ FPSData }) => {
  let data = [['Time(sec)', 'FPS']];
  if (FPSData) {
    FPSData.map((val) =>
      data.push([parseFloat(val.duration), parseInt(val.value)])
    );
    return (
      <MetricComponent data={data} name={['F', 'P', 'S']}></MetricComponent>
    );
  } else {
    return <React.Fragment>FPS Data is not available</React.Fragment>;
  }
};

const DisplayCPU = ({ CPUData }) => {
  let data = [['Time(sec)', 'App Usage', 'Device Usage']];
  if (CPUData) {
    CPUData.map((val) =>
      data.push([
        parseInt(val.duration),
        parseFloat(val.app),
        parseFloat(val.device),
      ])
    );
    return (
      <MetricComponent data={data} name={['C', 'P', 'U']}></MetricComponent>
    );
  } else {
    return <React.Fragment>CPU Data is not available</React.Fragment>;
  }
};

const DisplayMEM = ({ MEMData }) => {
  let data = [['Time(sec)', 'App Usage', 'Device Usage']];
  if (MEMData) {
    MEMData.map((val) =>
      data.push([
        parseInt(val.duration),
        parseFloat(val.app),
        parseFloat(val.device),
      ])
    );
    return (
      <MetricComponent
        data={data}
        name={['M', 'E', 'M', 'O', 'R', 'Y']}></MetricComponent>
    );
  } else {
    return <React.Fragment>CPU Data is not available</React.Fragment>;
  }
};

export default DisplayChart;
