// Import modules ==============================================================
import * as React from 'react';
import {Switch, Route} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';

import LandingView from '/component/view/LandingView';
import LoginView from '/component/view/LoginView';

import CSSReset from '/component/css/CSSReset';
import theme from '/theme';

class AppRoot extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <CSSReset />
          <Switch>
            <Route exact path="/" component={LandingView} />
            <Route exact path="/account/login" component={LoginView} />
            <Route exact path="/account/signup" component={LoginView} />
          </Switch>
        </React.Fragment>
      </ThemeProvider>
    );
  }
}

export default AppRoot;
