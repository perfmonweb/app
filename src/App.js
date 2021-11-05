import React from 'react';
import { HashRouter } from 'react-router-dom';
import BasicComponent from './components/basic/basic.component';
import CPUComponent from './components/cpu/cpu.component';
import FPSComponent from './components/fps/fps.component';
import MemoryComponent from './components/mem/mem.component';
import HeaderComponent from './components/header/header.component';
import { createStructuredSelector } from 'reselect';
import {
  selectisCPUChecked,
  selectisFPSChecked,
  selectisMEMChecked,
} from './redux/reducers/fps/fps.selector';
import { connect } from 'react-redux';
import {
  AppContainer,
  MetricContainer,
  Pane,
  Panel,
  SidePanel,
  SubContainer,
} from './App.styles';

class App extends React.Component {
  state = {
    fpsOpen: false,
    cpuOpen: false,
    memOpen: false,
  };

  render() {
    const { isFPSChecked, isCPUChecked, isMemChecked } = this.props;
    const { fpsOpen, cpuOpen, memOpen } = this.state;
    return (
      <HashRouter>
        <AppContainer>
          <HeaderComponent></HeaderComponent>
          <BasicComponent></BasicComponent>
          <MetricContainer>
            <SubContainer>
              {isFPSChecked ? (
                <FPSComponent></FPSComponent>
              ) : (
                <React.Fragment></React.Fragment>
              )}
              {isCPUChecked ? (
                <CPUComponent></CPUComponent>
              ) : (
                <React.Fragment></React.Fragment>
              )}
              {isMemChecked ? (
                <MemoryComponent></MemoryComponent>
              ) : (
                <React.Fragment></React.Fragment>
              )}
            </SubContainer>
            <SidePanel>
              <div className='heading'>
                <i class='stopwatch icon'></i>
                <label>Analytics</label>
              </div>
              <Panel>
                <Pane onClick={() => this.setState({ fpsOpen: !fpsOpen })}>
                  <div className='parent'>
                    <label className='head'>FPS Panel</label>
                    <label className='sub'>Frames per second</label>
                  </div>
                  {fpsOpen ? (
                    <div className='info' onClick={(e) => e.stopPropagation()}>
                      {/* FPS Values  
                      Number of iterations*/}
                    </div>
                  ) : (
                    <React.Fragment></React.Fragment>
                  )}
                </Pane>
                <Pane onClick={() => this.setState({ cpuOpen: !cpuOpen })}>
                  <div className='parent'>
                    <label className='head'>CPU Panel</label>
                    <label className='sub'>
                      Measure CPU usages for the game and device.
                    </label>
                  </div>
                  {cpuOpen ? (
                    <div className='info' onClick={(e) => e.stopPropagation()}>
                      {/* CPU values
                      Number of iterations */}
                    </div>
                  ) : (
                    <React.Fragment></React.Fragment>
                  )}
                </Pane>
                <Pane onClick={() => this.setState({ memOpen: !memOpen })}>
                  <div className='parent'>
                    <label className='head'>Memory Panel</label>
                    <label className='sub'>
                      Measures memory usages for game and device.
                    </label>
                  </div>
                  {memOpen ? (
                    <div className='info' onClick={(e) => e.stopPropagation()}>
                      {/* Memory values
                      Number of iterations */}
                    </div>
                  ) : (
                    <React.Fragment></React.Fragment>
                  )}
                </Pane>
              </Panel>
            </SidePanel>
          </MetricContainer>
        </AppContainer>
      </HashRouter>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isFPSChecked: selectisFPSChecked,
  isCPUChecked: selectisCPUChecked,
  isMemChecked: selectisMEMChecked,
});

export default connect(mapStateToProps)(App);
