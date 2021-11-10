import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  resetSession,
  setChecked,
  setDeviceProp,
  setError,
  setPackageName,
  setSessionTime,
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
  MainContainer,
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
  resetValues,
  selectError,
  setSessionTime,
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
    if (selectStatus !== 'device')
      setError('Please check your adb connection.');
    else setError('');
  }, [setDeviceProp, selectStatus, setError]);

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
        setTime(time + 100);
        setSessionTime(Math.floor(time / 1000));
      }, 100);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [startTimer, setSessionTime, time]);

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
    if (!selectisFPSChecked && !selectisCPUChecked && !selectisMEMChecked)
      setError('Please select metrics to measure from Analytics panel');
    else {
      if (!selectPackage) setError('Please select Package Name.');
      else if (!term) {
        setTerm(selectPackage);
        toggleRecording(true);
        setError('');
        setStartTimer(true);
      } else {
        toggleRecording(true);
        setError('');
        setStartTimer(true);
      }
    }
  };

  const stopRecording = () => {
    toggleRecording(false);
    setError('');
    setStartTimer(false);
  };

  const resetRecording = () => {
    toggleRecording(false);
    setError('');
    setStartTimer(false);
    setTime(0);
    resetValues();
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
    <MainContainer>
      <StyledInputContainer>
        <i className='search icon'></i>
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
        <div className='labels'>
          {selectDeviceName !== 'undefined' ? (
            <div className='ui circular label'>{selectDeviceName}</div>
          ) : (
            <div className='ui circular label'>Device Name</div>
          )}
          {selectDevicePlatform !== 'undefined' ? (
            <div className='ui circular label'>{selectDevicePlatform}</div>
          ) : (
            <div className='ui circular label'>Device Platform</div>
          )}
          <div className='ui circular label'>
            {selectPackage || 'Package Name'}
          </div>
          {selectDeviceBoard !== 'undefined' ? (
            <div className='ui circular label'>{selectDeviceBoard}</div>
          ) : (
            <div className='ui circular label'>Device Board</div>
          )}
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
            time ? (
              <button
                className={startButtonClassName}
                onClick={() => resetRecording()}>
                Reset
              </button>
            ) : (
              <button
                className={startButtonClassName}
                onClick={() => startRecording()}>
                Start Recording
              </button>
            )
          ) : (
            <button className='ui positive button disabled'>
              <span className='minutes'>{getMinutes(time)}m</span>
              <span className='seconds'>{trimSeconds(time)}s</span>
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
    </MainContainer>
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
  resetValues: () => dispatch(resetSession()),
  setSessionTime: (val) => dispatch(setSessionTime(val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BasicComponent);
