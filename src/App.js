import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import HeaderComponent from './components/header/header.component';
import { createStructuredSelector } from 'reselect';
import {
  selectisCPUChecked,
  selectisFPSChecked,
  selectisMEMChecked,
} from './redux/reducers/fps/fps.selector';
import { connect } from 'react-redux';
import { AppContainer } from './App.styles';
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
        </AppContainer>
      </Router>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isFPSChecked: selectisFPSChecked,
  isCPUChecked: selectisCPUChecked,
  isMemChecked: selectisMEMChecked,
});

export default connect(mapStateToProps)(App);
