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
import Login from './components/login/login.component';
import { auth, createUserProfileDocument } from './firebase/api';
import { onSnapshot } from '@firebase/firestore';
import { setCurrentUser } from './redux/actions';
import { selectCurrentUser } from './redux/reducers/user/user.selector';

class App extends React.Component {
  unSubscribefromAuth = null;
  state = {
    fpsOpen: false,
    cpuOpen: false,
    memOpen: false,
  };

  componentDidMount() {
    const { setCurrentUser } = this.props;
    console.log(this.props);
    this.unSubscribefromAuth = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        const userRef = createUserProfileDocument(userAuth);
        userRef.then((ref) => {
          onSnapshot(ref, (doc) => {
            const { id, ...data } = doc.data();
            setCurrentUser({
              id: ref.id,
              ...data,
            });
          });
        });
      }
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unSubscribefromAuth();
  }

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
            <Route path='/singin' component={Login} />
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
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
