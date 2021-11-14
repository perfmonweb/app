import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectCPUValues,
  selectCurrentCPU,
  selectCurrentFPS,
  selectCurrentMEM,
  selectFPSValues,
  selectisCPUChecked,
  selectisFPSChecked,
  selectisMEMChecked,
  selectMEMValues,
  selectSessionTime,
  selectIsRecording,
  selectSession,
  selectIsSessionAvailable,
  selectPackage,
  selectDeviceProp,
} from '../../redux/reducers/fps/fps.selector';
import { setChecked } from '../../redux/actions';
import { Pane, Panel, SidePanelContainer } from './side-panel.styles';
import {
  getAverageAppUsage,
  getAverageDeviceUsage,
  getAverageFPS,
} from '../../redux/reducers/fps/fps.utils';
import { updateDocument } from '../../firebase/api';

const SidePanel = ({
  isFPSChecked,
  isCPUChecked,
  isMEMChecked,
  setChecked,
  sessionTime,
  currentFPS,
  currentCPU,
  currentMEM,
  FPSValues,
  CPUValues,
  MEMValues,
  isRecording,
  isSessionAvailable,
  session,
  packageName,
  deviceProps,
}) => {
  const [fpsOpen, setIsFPSOpen] = useState(false);
  const [cpuOpen, setIsCPUOpen] = useState(false);
  const [memOpen, setIsMEMOpen] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [msg, setMsg] = useState('');

  const updateDocumentToFirebase = () => {
    const { sessionId, deviceId } = session;
    let data = {
      FPSValues,
      CPUValues,
      MEMValues,
      sessionTime,
      deviceProps,
    };
    updateDocument(
      ['Google', sessionId, 'Devices', deviceId, 'Games', packageName],
      data
    )
      .then(() => {
        setMsg('Sucessfully synced to cloud');
        setUploadStatus(true);
      })
      .catch((err) => {
        setMsg(err);
        setUploadStatus(true);
      });
  };
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
                disabled={isRecording}
              />
              <label></label>
            </div>
          </div>
          {fpsOpen ? (
            <div className='info' onClick={(e) => e.stopPropagation()}>
              <div className='row'>
                <div className='col'>Iterations</div>
                <div className='col'>{FPSValues?.length || 0}</div>
              </div>
              <div className='row'>
                <div className='col'>Current FPS</div>
                <div className='col'>{currentFPS?.value || 0}</div>
              </div>
              <div className='row'>
                <div className='col'>Average</div>
                <div className='col'>{getAverageFPS(FPSValues)}</div>
              </div>
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
                disabled={isRecording}
              />
              <label></label>
            </div>
          </div>
          {cpuOpen ? (
            <div className='info' onClick={(e) => e.stopPropagation()}>
              <div className='row'>
                <div className='col'>Iterations</div>
                <div className='col'>{CPUValues?.length || 0}</div>
              </div>
              <div className='row'>
                <div className='col'>Current App usage</div>
                <div className='col'>{currentCPU?.app || 0}</div>
              </div>
              <div className='row'>
                <div className='col'>Current Device usage</div>
                <div className='col'>{currentCPU?.device || 0}</div>
              </div>
              <div className='row'>
                <div className='col'>Average App Usage</div>
                <div className='col'>{getAverageAppUsage(CPUValues)}</div>
              </div>
              <div className='row'>
                <div className='col'>Average Device Usage</div>
                <div className='col'>{getAverageDeviceUsage(CPUValues)}</div>
              </div>
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
                disabled={isRecording}
              />
              <label></label>
            </div>
          </div>
          {memOpen ? (
            <div className='info' onClick={(e) => e.stopPropagation()}>
              <div className='row'>
                <div className='col'>Iterations</div>
                <div className='col'>{MEMValues?.length || 0}</div>
              </div>
              <div className='row'>
                <div className='col'>Current App usage</div>
                <div className='col'>{currentMEM?.app || 0}</div>
              </div>
              <div className='row'>
                <div className='col'>Current Device usage</div>
                <div className='col'>{currentMEM?.device || 0}</div>
              </div>

              <div className='row'>
                <div className='col'>Average App Usage</div>
                <div className='col'>{getAverageAppUsage(MEMValues)}</div>
              </div>
              <div className='row'>
                <div className='col'>Average Device Usage</div>
                <div className='col'>{getAverageDeviceUsage(MEMValues)}</div>
              </div>
            </div>
          ) : (
            <React.Fragment></React.Fragment>
          )}
        </Pane>
        {!isRecording && isSessionAvailable ? (
          <Pane
            onClick={() => {
              updateDocumentToFirebase();
            }}>
            <div className='cloud'>
              <i class='cloud upload icon'></i>
              <label>{uploadStatus ? msg : 'Sync to session'}</label>
            </div>
          </Pane>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </Panel>
    </SidePanelContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  isFPSChecked: selectisFPSChecked,
  isCPUChecked: selectisCPUChecked,
  isMEMChecked: selectisMEMChecked,
  sessionTime: selectSessionTime,
  currentFPS: selectCurrentFPS,
  currentCPU: selectCurrentCPU,
  currentMEM: selectCurrentMEM,
  FPSValues: selectFPSValues,
  CPUValues: selectCPUValues,
  MEMValues: selectMEMValues,
  isRecording: selectIsRecording,
  isSessionAvailable: selectIsSessionAvailable,
  session: selectSession,
  packageName: selectPackage,
  deviceProps: selectDeviceProp,
});

const mapDispatchToProps = (dispatch) => ({
  setChecked: (mod, val) => dispatch(setChecked(mod, val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);
