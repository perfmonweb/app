import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectisCPUChecked,
  selectisFPSChecked,
  selectisMEMChecked,
  selectSessionTime,
} from '../../redux/reducers/fps/fps.selector';
import { setChecked } from '../../redux/actions';
import { Pane, Panel, SidePanelContainer } from './side-panel.styles';

const SidePanel = ({
  isFPSChecked,
  isCPUChecked,
  isMEMChecked,
  setChecked,
  sessionTime,
}) => {
  const [fpsOpen, setIsFPSOpen] = useState(false);
  const [cpuOpen, setIsCPUOpen] = useState(false);
  const [memOpen, setIsMEMOpen] = useState(false);
  return (
    <SidePanelContainer time={sessionTime}>
      <div className='heading'>
        {/* <i class='stopwatch icon'></i> */}
        <div className='stopWatch'>
          <div className='full-tick'></div>
          <div className='push'></div>
          <div className='side'></div>
        </div>
        <label className='head'>Analytics</label>
      </div>
      <Panel>
        <Pane onClick={() => setIsFPSOpen(!fpsOpen)}>
          <div className='parent'>
            <div className='labels'>
              <label className='head'>FPS Panel</label>
              <label className='sub'>Frames per second</label>
            </div>
            <div
              className='ui checkbox'
              onClick={(e) => {
                e.stopPropagation();
              }}>
              <input
                type='checkbox'
                checked={isFPSChecked}
                onChange={(e) => {
                  e.stopPropagation();
                  setChecked('fpsChecked', e.target.checked);
                }}
              />
              <label></label>
            </div>
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
        <Pane
          onClick={(e) => {
            e.stopPropagation();
            setIsCPUOpen(!cpuOpen);
          }}>
          <div className='parent'>
            <div className='labels'>
              <label className='head'>CPU Panel</label>
              <label className='sub'>
                Measure CPU usages for the game and device.
              </label>
            </div>

            <div className='ui checkbox' onClick={(e) => e.stopPropagation()}>
              <input
                type='checkbox'
                checked={isCPUChecked}
                onChange={(e) => {
                  setChecked('cpuChecked', e.target.checked);
                }}
              />
              <label></label>
            </div>
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
        <Pane
          onClick={(e) => {
            setIsMEMOpen(!memOpen);
          }}>
          <div className='parent'>
            <div className='labels'>
              <label className='head'>Memory Panel</label>
              <label className='sub'>
                Measures memory usages for game and device.
              </label>
            </div>
            <div className='ui checkbox' onClick={(e) => e.stopPropagation()}>
              <input
                type='checkbox'
                checked={isMEMChecked}
                onChange={(e) => {
                  e.stopPropagation();
                  setChecked('memChecked', e.target.checked);
                }}
              />
              <label></label>
            </div>
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
    </SidePanelContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  isFPSChecked: selectisFPSChecked,
  isCPUChecked: selectisCPUChecked,
  isMEMChecked: selectisMEMChecked,
  sessionTime: selectSessionTime,
});

const mapDispatchToProps = (dispatch) => ({
  setChecked: (mod, val) => dispatch(setChecked(mod, val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);
