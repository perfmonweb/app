import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import HeaderComponent from './components/header/header.component';
import { createStructuredSelector } from 'reselect';
import {
  selectError,
  selectisCPUChecked,
  selectisFPSChecked,
  selectisMEMChecked,
} from './redux/reducers/fps/fps.selector';
import { connect } from 'react-redux';
import { AnimatedPet, AppContainer } from './App.styles';
import HomeComponent from './components/home/home.component';
import NoMatchComponent from './components/no-match/no-match.component';
import DisplayChart from './components/sessions/display-chart/display-chart.component';
import Games from './components/sessions/games/games.component';
import Directory from './components/sessions/directory/directory.component';

class App extends React.Component {
  state = {
    fpsOpen: false,
    cpuOpen: false,
    memOpen: false,
  };

  createElement = (Component, props) => {
    return <Component key={`${props.route.name}RouteComponent`} {...props} />;
  };

  render() {
    return (
      <Router history={history}>
        <AppContainer>
          <HeaderComponent></HeaderComponent>
          <div>
            <Switch>
              <Route path='/' exact component={HomeComponent} />
              <Route path='/allSessions/:a' exact component={Directory} />
              <Route path='/allSessions/:a/:b' exact component={Games} />
              <Route
                path='/allSessions/:a/:b/:c'
                exact
                component={DisplayChart}
              />
              <Route path='*' component={NoMatchComponent} />
            </Switch>
          </div>
          <AnimatedPet length={this.props.displayError.length}>
            <div className='pet'>
              <div className='icon'>
                <i class='rocketchat icon'></i>
              </div>
              {this.props.displayError ? (
                <label className='label1'>{this.props.displayError}</label>
              ) : (
                <React.Fragment></React.Fragment>
              )}
            </div>
          </AnimatedPet>
        </AppContainer>
      </Router>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isFPSChecked: selectisFPSChecked,
  isCPUChecked: selectisCPUChecked,
  isMemChecked: selectisMEMChecked,
  displayError: selectError,
});

export default connect(mapStateToProps)(App);
