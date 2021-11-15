import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import App from './App';
import history from './history';
import { Router, Route, Switch } from 'react-router-dom';
import Welcome from './components/welcome/welcome.component';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        {/* <PersistGate persistor={persistor}> */}
        <div>
          <Switch>
            <Route exact path='/' component={Welcome} />
            <Route path='/web' component={App} />
          </Switch>
        </div>
        {/* </PersistGate> */}
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
