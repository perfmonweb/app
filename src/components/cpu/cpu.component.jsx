import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setError, setCPU, toggleRecording } from '../../redux/actions';
import {
  selectCPUValues,
  selectCurrentCPU,
  selectIsRecording,
  selectPackage,
} from '../../redux/reducers/fps/fps.selector';
import MetricComponent from '../metric/metric.component';

class CPUComponent extends Component {
  interval = null;
  i = 0;
  componentDidUpdate() {
    // Update with CPU related data
    const apiUrl = `http://127.0.0.1:5002/cpu/${this.props.selectedPackage}`;

    if (this.props.selectIsRecording) {
      this.interval = setTimeout(() => {
        fetch(apiUrl).then((response) => {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.indexOf('application/json') !== -1) {
            return response.json().then((data) => {
              // process JSON data
              this.props.setCPU({
                app: parseFloat(data.app).toFixed(2),
                device: parseFloat(data.device).toFixed(2),
                duration: this.i++,
              });
            });
          } else {
            return response.text().then((text) => {
              // process error from server
              this.props.setError(text);
              this.props.toggleRecording(false);
            });
          }
        });
      }, 800);
    }
  }
  render() {
    let data = [['Time(sec)', 'App Usage', 'Device Usage']];
    if (this.props.selectCPUValues)
      this.props.selectCPUValues.map((val) =>
        data.push([
          parseInt(val.duration),
          parseFloat(val.app),
          parseFloat(val.device),
        ])
      );

    return (
      <MetricComponent
        data={data}
        name={['C', 'P', 'U']}
        currentMetricValue={0}
        currentMetricDuration={
          this.props.selectCurrentCPU?.duration || 0
        }></MetricComponent>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  selectIsRecording: selectIsRecording,
  selectedPackage: selectPackage,
  selectCurrentCPU: selectCurrentCPU,
  selectCPUValues: selectCPUValues,
});

const mapDispatchToProps = (dispatch) => ({
  setError: (err) => dispatch(setError(err)),
  toggleRecording: (val) => dispatch(toggleRecording(val)),
  setCPU: (val) => dispatch(setCPU(val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CPUComponent);
