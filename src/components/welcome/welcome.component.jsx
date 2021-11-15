import './welcome.styles.scss';
import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className='main-page'>
      <div className='help-box button'>
        <label>How it works?</label>
      </div>
      <Link className='app button' to='/web'>
        <i class='play circle icon black'></i>
        <label>Launch App</label>
      </Link>
      <div className='header'>
        <div className='logo-box'>
          <div className='stopWatch'>
            <div className='full-tick'></div>
            <div className='push'></div>
            <div className='side'></div>
          </div>
        </div>

        <div className='text-box'>
          <h1 className='heading-primary'>
            <span className='main'>PerfMon</span>
            <span className='sub'>Measure performance metrics</span>
          </h1>
        </div>
      </div>
      <div className='about'>
        <div className='content'>
          <h2 className='heading'>What do we measure?</h2>
          <div className='cards'>
            <div className='card'>
              <div className='front'>
                <div className='head'>FPS</div>
                <div className='body'>
                  Frame rate (frequently referred as frames per second) is
                  defined as the frequency at rate the consecutive frames
                  captures in a second.
                </div>
              </div>
              <div className='back'>
                <a
                  href='https://developer.android.com/guide/topics/media/frame-rate'
                  rel='noreferrer'
                  target='_blank'>
                  Learn More
                </a>
              </div>
            </div>
            <div className='card'>
              <div className='front'>
                <div className='head'>CPU</div>
                <div className='body'>
                  Captures the average CPU(%) values of device and the
                  application.
                </div>
              </div>
              <div className='back'>
                <a
                  href='https://developer.android.com/studio/profile/cpu-profiler'
                  rel='noreferrer'
                  target='_blank'>
                  Learn More
                </a>
              </div>
            </div>
            <div className='card'>
              <div className='front'>
                <div className='head'>Memory</div>
                <div className='body'>
                  Captures the average Memory(MB) used by device and the
                  application.
                </div>
              </div>
              <div className='back'>
                <a
                  href='https://developer.android.com/studio/profile/memory-profiler'
                  rel='noreferrer'
                  target='_blank'>
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='footer'>
        <div className='main'>
          <div className='logo-box'>
            <div className='stopWatch'>
              <div className='full-tick'></div>
              <div className='push'></div>
              <div className='side'></div>
            </div>
          </div>
          <div className='app-name'>PerfMon</div>
        </div>
        <div className='links'></div>
        <div className='author'>
          <div className='info'>
            <div>
              Developed by: <i class='copyright outline icon'></i> Chandra
              Kishore Danduri
            </div>
            <div>Email: perfmonweb@gmail.com</div>
            <div>
              <i class='linkedin icon'></i>
              <i class='github icon'></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
