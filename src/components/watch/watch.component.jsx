import React from 'react';
import { Link } from 'react-router-dom';
import { Route, Router, Switch } from 'react-router';
import { HashRouter } from 'react-router-dom';
import FPSComponent from '../fps/fps.component';
import CPUComponent from '../cpu/cpu.component';
import MemoryComponent from '../mem/mem.component';
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
        <Switch>
          <Route path='/fps' exact component={FPSComponent} />
          <Route path='/cpu' exact component={CPUComponent} />
          <Route path='/mem' exact component={MemoryComponent} />
        </Switch>
      </div>
    </div>
  );
}

export default WatchComponent;
