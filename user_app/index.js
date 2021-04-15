import 'isomorphic-fetch';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';

import activityInitializer from './initializers/activity';
import amplitudeInitializer from './initializers/amplitude';

import ConnectedPersonalInfo from './pages/personal_info_page';

import store from './store';
import brand from './lib/brand';
import './index.css';

activityInitializer();
amplitudeInitializer();

function requireAuth(nextState, replace, cb) {
  return store.dispatch(verifyUser())
    .then(() => cb())
    .catch((err) => {
      replace({
        pathname: '/login',
        query: {
          ...nextState.location.query,
          originalPath: nextState.location.pathname,
        },
      });
      cb();
    });
}


window.browserHistory = browserHistory;

render(
  (
    <Provider store={store}>
      <MuiThemeProvider theme={brand.nextTheme}>
        <Router history={browserHistory}>
          <Route path="/personal_info" component={ConnectedPersonalInfo} onEnter={requireAuth} />
        </Router>
      </MuiThemeProvider>
    </Provider>
  ), document.getElementById('root'),
);
