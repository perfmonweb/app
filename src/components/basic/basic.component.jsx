import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
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
  selectIsRecording,
  selectPackage,
  selectStatus,
} from '../../redux/reducers/fps/fps.selector';
import {
  DebugSection,
  Details,
  StyledDropDownElements,
  StyledInput,
  StyledInputContainer,
} from './basic.styles';

function BasicComponent({
  setPackage,
  selectedPackage,
  selectStatus,
  setDeviceProp,
  selectDeviceName,
  selectDevicePlatform,
  selectDeviceBoard,
  toggleRecording,
  selectIsRecording,
  setError,
  selectError,
}) {
  const [packages, setPackages] = useState([]);
  const [term, setTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState(term);

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
    if (selectedPackage === debouncedTerm) {
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
  }, [selectedPackage, debouncedTerm]);

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
    selectedPackage && !selectIsRecording ? '' : 'disabled'
  }`;

  const stopButtonClassName = `ui negative button ${
    selectedPackage && selectIsRecording ? '' : 'disabled'
  }`;

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
            <label className='subCol'>{selectedPackage}</label>
          </div>
          <div className='col'>
            <label className='subCol'>Board</label>
            <label className='subCol'>{selectDeviceBoard}</label>
          </div>
        </div>
      </Details>
      <DebugSection>
        <div className='debug'>
          <label style={{ color: '#db3236' }}>
            {selectError
              ? selectError
              : selectStatus
              ? selectedPackage
                ? ''
                : 'Please select package name.'
              : 'Please check your adb connection.'}
          </label>
        </div>
        <div className='buttons'>
          <button
            className={startButtonClassName}
            onClick={() => {
              toggleRecording();
              setError();
            }}>
            Start Recording
          </button>
          <button
            className={stopButtonClassName}
            onClick={() => {
              toggleRecording();
              setError();
            }}>
            Stop Recording
          </button>
        </div>
      </DebugSection>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  selectedPackage: selectPackage,
  selectStatus: selectStatus,
  selectDeviceName: selectDeviceName,
  selectDevicePlatform: selectDevicePlatform,
  selectDeviceBoard: selectDeviceBoard,
  selectIsRecording: selectIsRecording,
  selectError: selectError,
});

const mapDispatchToProps = (dispatch) => ({
  setPackage: (val) => dispatch(setPackageName(val)),
  setDeviceProp: (val) => dispatch(setDeviceProp(val)),
  toggleRecording: () => dispatch(toggleRecording()),
  setError: (err) => dispatch(setError(err)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BasicComponent);
