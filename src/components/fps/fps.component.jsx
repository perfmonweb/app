import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setError, setFPS, toggleRecording } from '../../redux/actions';
import {
  selectCurrentFPS,
  selectFPSValues,
  selectIsRecording,
  selectPackage,
} from '../../redux/reducers/fps/fps.selector';
import MetricComponent from '../metric/metric.component';

class FPSComponent extends Component {
  interval = null;
  i = 0;
  componentDidUpdate() {
    const apiUrl = `http://127.0.0.1:5002/fps/${this.props.selectedPackage}`;

    if (this.props.selectIsRecording) {
      this.interval = setTimeout(() => {
        fetch(apiUrl).then((response) => {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.indexOf('application/json') !== -1) {
            return response.json().then((data) => {
              // process JSON data
              this.props.setFPS({
                value: parseFloat(data).toFixed(2),
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
      }, 900);
    }
  }
  render() {
    let data = [['Time(sec)', 'FPS']];
    this.props.selectFPSValues.map((val) =>
      data.push([parseFloat(val.duration), parseInt(val.value)])
    );
    return (
      <MetricComponent data={data} name={['F', 'P', 'S']}></MetricComponent>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  selectIsRecording: selectIsRecording,
  selectedPackage: selectPackage,
  selectCurrentFPS: selectCurrentFPS,
  selectFPSValues: selectFPSValues,
});

const mapDispatchToProps = (dispatch) => ({
  setError: (err) => dispatch(setError(err)),
  toggleRecording: (val) => dispatch(toggleRecording(val)),
  setFPS: (val) => dispatch(setFPS(val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FPSComponent);
