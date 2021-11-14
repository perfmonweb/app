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
import Single from './components/sessions/singledir/single.component';

class App extends React.Component {
  state = {
    fpsOpen: false,
    cpuOpen: false,
    memOpen: false,
  };

  render() {
    const { match } = this.props;
    return (
      <AppContainer>
        {/* <Route path='/welcome' exact component={Welcome} /> */}
        <HeaderComponent></HeaderComponent>
        <div>
          <Switch>
            <Route exact path={`${match.path}`} component={HomeComponent} />
            <Route
              path={[
                `${match.path}/:level/:l0`,
                `${match.path}/:level/:l0/:l1`,
                `${match.path}/:level/:l0/:l1/:l2`,
                `${match.path}/:level/:l0/:l1/:l2/:l3`,
                `${match.path}/:level/:l0/:l1/:l2/:l3/:l4`,
                `${match.path}/:level/:l0/:l1/:l2/:l3/:l4/:l5`,
                `${match.path}/:level/:l0/:l1/:l2/:l3/:l4/:l5/:l6`,
              ]}
              exact
              component={(props) => (
                <Single {...props} key={window.location.pathname} />
              )}
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
