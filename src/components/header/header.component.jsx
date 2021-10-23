import React from 'react';
import { Item, Logo, MainContainer, Status } from './header.styles';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectIp, selectStatus } from '../../redux/reducers/fps/fps.selector';
import { setDevice } from '../../redux/actions';

class HeaderComponent extends React.Component {
  componentDidMount() {
    const apiUrl = 'http://127.0.0.1:5002/getdevices';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => this.props.setDevice(data));
  }

  render() {
    const { ip, status } = this.props;
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
          <Item>
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
});

const mapDispatchToProps = (dispatch) => ({
  setDevice: (val) => dispatch(setDevice(val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
