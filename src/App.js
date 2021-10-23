import React from 'react';
import BasicComponent from './components/basic/basic.component';
import HeaderComponent from './components/header/header.component';
import WatchComponent from './components/watch/watch.component';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <HeaderComponent></HeaderComponent>
        <BasicComponent></BasicComponent>
        <WatchComponent></WatchComponent>
      </div>
    );
  }
}
