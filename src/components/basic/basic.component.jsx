import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  setChecked,
  setDeviceProp,
  setError,
  setPackageName,
  toggleRecording,
} from '../../redux/actions';
import {
  selectDeviceBoard,
  selectDeviceName,
  selectDevicePlatform,
  selectError,
  selectisCPUChecked,
  selectisFPSChecked,
  selectisMEMChecked,
  selectIsRecording,
  selectPackage,
  selectStatus,
} from '../../redux/reducers/fps/fps.selector';
import {
  DebugSection,
  Details,
  ModuleSelection,
  StyledDropDownElements,
  StyledInput,
  StyledInputContainer,
} from './basic.styles';

function BasicComponent({
  setPackage,
  selectPackage,
  selectStatus,
  setDeviceProp,
  selectDeviceName,
  selectDevicePlatform,
  selectDeviceBoard,
  toggleRecording,
  selectIsRecording,
  setError,
  setChecked,
  selectError,
  selectisFPSChecked,
  selectisCPUChecked,
  selectisMEMChecked,
}) {
  const [packages, setPackages] = useState([]);
  const [term, setTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [time, setTime] = useState(0);
  const [startTimer, setStartTimer] = useState(false);

  useEffect(() => {
    const apiUrl = `http://127.0.0.1:5002/getdeviceprop`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setDeviceProp(data));
  }, [setDeviceProp]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 500);
    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(() => {
    if (selectPackage === debouncedTerm) {
      setPackages([]);
    } else {
      if (debouncedTerm) {
        const apiUrl = `http://127.0.0.1:5002/packages/${debouncedTerm}`;
        fetch(apiUrl, { method: 'POST' })
          .then((response) => response.json())
          .then((data) => setPackages(data));
      } else {
        setPackages([]);
      }
    }
  }, [selectPackage, debouncedTerm]);

  useEffect(() => {
    let interval = null;
    if (startTimer) {
      interval = setInterval(() => {
        setTime((t) => t + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [startTimer]);

  const onTermChange = (e) => {
    e.stopPropagation();
    if (e.target.value) {
      setTerm(e.target.value);
    } else {
      setTerm('');
      setPackages([]);
    }
  };

  const setPackageTerm = (val) => {
    setDebouncedTerm('');
    setTerm(val);
    setPackage(val);
    setDebouncedTerm('');
    setPackages([]);
  };

  const startButtonClassName = `ui positive button ${
    selectPackage && !selectIsRecording ? '' : 'disabled'
  }`;

  const stopButtonClassName = `ui negative button ${
    selectPackage && selectIsRecording ? '' : 'disabled'
  }`;

  const startRecording = () => {
    toggleRecording(true);
    setError('');
    setStartTimer(true);
  };

  const stopRecording = () => {
    toggleRecording(false);
    setError('');
    setStartTimer(false);
    setTime(0);
  };

  const getSeconds = (ms) => parseInt(Math.ceil(ms / 1000)) - 1;

  const trimSeconds = (ms) =>
    (parseInt(getSeconds(ms)) % 60).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });

  const getMilliSeconds = (ms) =>
    parseInt((ms % 1000) / 10).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });

  const getMinutes = (ms) => {
    let sec = getSeconds(ms);
    return parseInt(parseInt(sec) / 60).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  };

  return (
    <div style={{ width: '99vw' }}>
      <StyledInputContainer>
        <label className='label'>
          <div className='centered'>Application package</div>
        </label>
        <StyledInput
          type='text'
          name='package'
          placeholder='select the package name'
          value={term}
          onChange={(e) => onTermChange(e)}
        />
        <i className='dropdown icon'></i>
      </StyledInputContainer>
      {packages.length === 0 ? (
        <React.Fragment></React.Fragment>
      ) : (
        <StyledDropDownElements>
          {packages.map((val, idx) => (
            <div
              className='element'
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setPackageTerm(val);
              }}>
              {val}
            </div>
          ))}
        </StyledDropDownElements>
      )}
      <Details>
        <div className='row'>
          <div className='col'>
            <label className='subCol'>Device</label>
            <label className='subCol'>{selectDeviceName}</label>
          </div>
          <div className='col'>
            <label className='subCol'>Platform</label>
            <label className='subCol'>{selectDevicePlatform}</label>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <label className='subCol'>Selected application </label>
            <label className='subCol'>{selectPackage}</label>
          </div>
          <div className='col'>
            <label className='subCol'>Board</label>
            <label className='subCol'>{selectDeviceBoard}</label>
          </div>
        </div>
      </Details>
      <DebugSection>
        <div className='debug'>
          <label>Debug: </label>
          <label>
            {selectError
              ? selectError
              : selectStatus
              ? selectPackage
                ? ''
                : 'Please select package name.'
              : 'Please check your adb connection.'}
          </label>
        </div>
        <div className='buttons'>
          {!selectIsRecording ? (
            <button
              className={startButtonClassName}
              onClick={() => startRecording()}>
              Start Recording
            </button>
          ) : (
            <button className='ui positive button disabled'>
              <span className='minutes'>{getMinutes(time)}:</span>
              <span className='seconds'>{trimSeconds(time)}</span>
              <span className='ms'>{getMilliSeconds(time)}</span>
            </button>
          )}
          <button
            className={stopButtonClassName}
            onClick={() => stopRecording()}>
            Stop Recording
          </button>
        </div>
      </DebugSection>
      <ModuleSelection>
        <div className='fps'>
          <div className='ui checkbox'>
            <input
              type='checkbox'
              checked={selectisFPSChecked}
              onChange={(e) => {
                e.stopPropagation();
                setChecked('fpsChecked', e.target.checked);
              }}
            />
            <label>FPS</label>
          </div>
        </div>
        <div className='cpu'>
          <div className='ui checkbox'>
            <input
              type='checkbox'
              checked={selectisCPUChecked}
              onChange={(e) => {
                e.stopPropagation();
                setChecked('cpuChecked', e.target.checked);
              }}
            />
            <label>CPU</label>
          </div>
        </div>
        <div className='mem'>
          <div className='ui checkbox'>
            <input
              type='checkbox'
              checked={selectisMEMChecked}
              onChange={(e) => {
                e.stopPropagation();
                setChecked('memChecked', e.target.checked);
              }}
            />
            <label>MEMORY</label>
          </div>
        </div>
        <div className='warn'>
          {`< Turning them off while test runs will effect your data`}
        </div>
      </ModuleSelection>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  selectPackage,
  selectStatus,
  selectDeviceName,
  selectDevicePlatform,
  selectDeviceBoard,
  selectIsRecording,
  selectError,
  selectisFPSChecked,
  selectisCPUChecked,
  selectisMEMChecked,
});

const mapDispatchToProps = (dispatch) => ({
  setPackage: (val) => dispatch(setPackageName(val)),
  setDeviceProp: (val) => dispatch(setDeviceProp(val)),
  toggleRecording: (val) => dispatch(toggleRecording(val)),
  setError: (err) => dispatch(setError(err)),
  setChecked: (mod, val) => dispatch(setChecked(mod, val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BasicComponent);
