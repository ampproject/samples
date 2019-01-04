// Import modules ==============================================================
import * as React from 'react';
import {Switch, Route} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';

import LandingView from '/component/view/LandingView';
import CSSReset from '/component/css/CSSReset';

import theme from '/theme';

class AppRoot extends React.Component {
  static rootElementId = 'app';
  render() {
    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <CSSReset />
          <Switch>
            <Route exact path="/" component={LandingView} />
          </Switch>
        </React.Fragment>
      </ThemeProvider>
    );
  }
}

export default AppRoot;
