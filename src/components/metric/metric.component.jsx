import React from 'react';
import './metric.styles.scss';
import { Chart } from 'react-google-charts';

class MetricComponent extends React.Component {
  render() {
    console.log(this.props.currentMetricValue);
    return (
      <div className='fps-container'>
        <div className='lineChart'>
          {this.props.data.length > 1 ? (
            <Chart
              chartType='LineChart'
              data={this.props.data.map((val) => val)}
              width='100%'
              height='400px'
              legendToggle
              options={{
                hAxis: {
                  title: 'Iterations',
                },
                vAxis: {
                  title: `${this.props.name.join('')}`,
                },
              }}
            />
          ) : (
            <div className='display'>
              <div className='centered'>
                {this.props.name.map((a) => (
                  <span>{a}</span>
                ))}
              </div>
            </div>
          )}
        </div>
        {this.props.currentMetricDuration ? (
          <div className='data'>
            <div className='name'>
              {this.props.name.map((a) => (
                <span>{a}</span>
              ))}
            </div>
            <div className='value'>
              <span className='col'>Current {this.props.name}</span>
              <span className='col'>{this.props.currentMetricValue}</span>
            </div>
            <div className='duration'>
              <span className='col'>Iterations(~1.5sec)</span>
              <span className='col'>{this.props.currentMetricDuration}</span>
            </div>
          </div>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </div>
    );
  }
}

export default MetricComponent;
