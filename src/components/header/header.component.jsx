import React from 'react';
import {
  AllSessions,
  Item,
  Logo,
  MainContainer,
  SessionTab,
  Status,
  ToolTip,
} from './header.styles';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
  selectDeviceBoard,
  selectDevicePlatform,
  selectError,
  selectIp,
  selectSession,
  selectStatus,
} from '../../redux/reducers/fps/fps.selector';
import { setDevice, setError, setSession } from '../../redux/actions';
import { v1 } from 'uuid';
import { addDocumentToCollection, isDocumentExists } from '../../firebase/api';

class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.connectSession = this.connectSession.bind(this);
  }

  componentDidMount() {
    const apiUrl = 'http://127.0.0.1:5002/getdevices';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => this.props.setDevice(data));
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  connectSession(event) {
    const { deviceBoard, devicePlatform, status } = this.props;
    const inputProvided = this.state.value.trim();
    const sessionId = `${inputProvided}_${new Date().getTime()}`.trim();
    const testId = v1();
    const documentName =
      `${deviceBoard.trim()}_${devicePlatform.trim()}`.trim();
    if (status !== 'device') {
      alert('Please connect to the device using adb');
    } else {
      if (this.props.error) {
        alert('Please connect to the device using adb');
      } else {
        isDocumentExists(['Google', inputProvided]).then((isExists) => {
          // if the document exists, add/overwrite the data.
          if (isExists) {
            // Adding the device info to the session.
            addDocumentToCollection(
              ['Google', inputProvided, 'Devices', documentName],
              {
                sessionId: inputProvided,
                testId,
                deviceId: documentName,
              }
            );
            this.props.setSession({
              sessionId: inputProvided,
              testId,
              deviceId: documentName,
            });
          } else {
            // Creating a new session with the device info
            addDocumentToCollection(['Google', sessionId], {
              sessionId,
              testId,
            }).then(() => {
              addDocumentToCollection(
                ['Google', sessionId, 'Devices', documentName],
                {
                  deviceId: documentName,
                }
              );
            });
            this.props.setSession({
              sessionId,
              testId,
              deviceId: documentName,
            });
          }
        });

        event.preventDefault();
      }
    }
  }

  render() {
    const { ip, status, session } = this.props;
    return (
      <div>
        <MainContainer>
          <Logo>
            <div className='centered'>
              <span>G</span>
              <span>o</span>
              <span>o</span>
              <span>g</span>
              <span>l</span>
              <span>e</span>
            </div>
          </Logo>
          <Status light={status}>
            <div className='st'>
              {status === 'device'
                ? 'connected'
                : status === ''
                ? 'No device connected'
                : status}
            </div>
            <div className='light'></div>
            <div className='ip'>{ip}</div>
          </Status>
          {!session.sessionId ? (
            <SessionTab>
              <div className='.input'>
                <form>
                  <input
                    type='text'
                    name='session'
                    placeholder='Session Name (Opt.)'
                    value={this.state.value}
                    onChange={this.handleChange}
                  />
                  <ToolTip onClick={this.connectSession}>
                    <i
                      className='sign-in icon'
                      style={{ color: '#179C52' }}></i>
                    <span className='tooltip'>Connect to the session</span>
                  </ToolTip>
                </form>
              </div>
            </SessionTab>
          ) : (
            <Status light='device' style={{ left: '70%' }}>
              <div className='st'>connected to '{session.sessionId}'</div>
              <div
                className='copyIcon press'
                onClick={() => {
                  navigator.clipboard.writeText(session.sessionId);
                }}>
                <i className='small copy outline icon'></i>
              </div>
              <div className='ip'>
                <ToolTip onClick={() => this.props.setSession({})}>
                  <i className='close icon' style={{ color: '#FF3E30CC' }}></i>
                  <span className='tooltip'>Close the session</span>
                </ToolTip>
              </div>
            </Status>
          )}
          <AllSessions
            to='/app/0/Google'
            onClick={() => this.props.setError('')}>
            <label>All Sessions</label>
          </AllSessions>
          <Item to='/app'>
            <div className='centered'>
              <span>P</span>
              <span>e</span>
              <span>r</span>
              <span>f</span>
              <span>M</span>
              <span>o</span>
              <span>n</span>
            </div>
          </Item>
        </MainContainer>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  ip: selectIp,
  status: selectStatus,
  session: selectSession,
  error: selectError,
  deviceBoard: selectDeviceBoard,
  devicePlatform: selectDevicePlatform,
});

const mapDispatchToProps = (dispatch) => ({
  setDevice: (val) => dispatch(setDevice(val)),
  setSession: (val) => dispatch(setSession(val)),
  setError: (val) => dispatch(setError(val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
