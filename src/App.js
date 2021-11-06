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
  SidePanelContainer,
  SubContainer,
} from './App.styles';
import SidePanel from './components/side-panel/side-panel.component';

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
            <SidePanel />
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
