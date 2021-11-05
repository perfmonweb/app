import React from 'react';
import './metric.styles.scss';
import { Chart } from 'react-google-charts';

class MetricComponent extends React.Component {
  render() {
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
      </div>
    );
  }
}

export default MetricComponent;
