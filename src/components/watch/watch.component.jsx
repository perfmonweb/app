import React from 'react';
import { Link } from 'react-router-dom';
import { Route, Router, Switch } from 'react-router';
import FPSComponent from '../fps/fps.component';
import CPUComponent from '../cpu/cpu.component';
import MemoryComponent from '../mem/mem.component';
import history from '../../history';
import './watch.styles.scss';

function WatchComponent() {
  return (
    <div className='watchContainer'>
      <div className='ui pointing menu'>
        <Link to='/fps' className='item'>
          FPS
        </Link>
        <Link to='/cpu' className='item'>
          CPU
        </Link>
        <Link to='/mem' className='item'>
          Memory
        </Link>
      </div>
      <div>
        <Router history={history}>
          <div>
            <Switch>
              <Route path='/fps' exact component={FPSComponent} />
              <Route path='/cpu' component={CPUComponent} />
              <Route path='/mem' component={MemoryComponent} />
            </Switch>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default WatchComponent;
