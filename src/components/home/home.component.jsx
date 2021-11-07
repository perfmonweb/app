import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { MetricContainer, SubContainer } from '../../App.styles';
import {
  selectisCPUChecked,
  selectisFPSChecked,
  selectisMEMChecked,
} from '../../redux/reducers/fps/fps.selector';
import BasicComponent from '../basic/basic.component';
import CPUComponent from '../cpu/cpu.component';
import FPSComponent from '../fps/fps.component';
import MemComponent from '../mem/mem.component';
import SidePanel from '../side-panel/side-panel.component';

const HomeComponent = ({ isFPSChecked, isCPUChecked, isMemChecked }) => {
  return (
    <div>
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
            <MemComponent></MemComponent>
          ) : (
            <React.Fragment></React.Fragment>
          )}
        </SubContainer>
        <SidePanel />
      </MetricContainer>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isFPSChecked: selectisFPSChecked,
  isCPUChecked: selectisCPUChecked,
  isMemChecked: selectisMEMChecked,
});

export default connect(mapStateToProps)(HomeComponent);
