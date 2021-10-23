import React from 'react';
import { Chart } from 'react-google-charts';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setError, toggleRecording } from '../../redux/actions';
import {
  selectIsRecording,
  selectPackage,
} from '../../redux/reducers/fps/fps.selector';
import './fps.styles.scss';

class FPSComponent extends React.Component {
  state = {
    fps: [],
  };
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
              this.setState({
                fps: [
                  ...this.state.fps,
                  {
                    value: parseFloat(data).toFixed(2),
                    duration: this.i++,
                  },
                ],
              });
            });
          } else {
            return response.text().then((text) => {
              // process error from server
              this.props.setError(text);
              this.props.toggleRecording();
            });
          }
        });
      }, 1000);
    }
  }

  render() {
    let data = [['Time(sec)', 'FPS']];
    this.state.fps.map((val) =>
      data.push([parseFloat(val.duration), parseInt(val.value)])
    );
    return (
      <div>
        <div className='lineChart'>
          <Chart
            chartType='LineChart'
            data={data.map((val) => val)}
            width='100%'
            height='400px'
            legendToggle
            options={{
              hAxis: {
                title: 'Time',
              },
              vAxis: {
                title: 'FPS',
              },
            }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  selectIsRecording: selectIsRecording,
  selectedPackage: selectPackage,
});

const mapDispatchToProps = (dispatch) => ({
  setError: (err) => dispatch(setError(err)),
  toggleRecording: () => dispatch(toggleRecording()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FPSComponent);
