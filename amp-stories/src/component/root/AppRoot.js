// Import modules ==============================================================
import * as React from 'react';
import {Switch, Route} from 'react-router-dom';
import {ThemeProvider, createGlobalStyle} from 'styled-components';

import GreatStoryView from '/component/view/GreatStoryView';
import AnimationsStoryView from '/component/view/AnimationsStoryView';
import MediaComponentsStoryView from '/component/view/MediaComponentsStoryView';
import LayoutStoryView from '/component/view/LayoutStoryView';
import LinkComponentStoryView from '/component/view/LinkComponentsStoryView';
import WrapUpStoryView from '/component/view/WrapUpStoryView';
import MillennialsStoryView from '/component/view/MillennialsStoryView';

import CSSReset from '/component/css/CSSReset';

import theme from '/theme';

const GlobalCSS = createGlobalStyle`
  amp-story-grid-layer {
    height: calc(var(--story-page-vh)*100);
  }
  html.amp-tutorial {
    font-size: calc(var(--story-page-vw, 3.2px) * 4);
  }
`;

class AppRoot extends React.Component {
  static rootElementId = 'app';
  render() {
    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <CSSReset />
          <GlobalCSS />
          <Switch>
            <Route exact path="/" component={MillennialsStoryView} />
            <Route
              exact
              path={'/stories/behind-the-story'}
              component={GreatStoryView}
            />
            <Route
              exact
              path={'/stories/animations'}
              component={AnimationsStoryView}
            />
            <Route
              exact
              path={'/stories/media-components'}
              component={MediaComponentsStoryView}
            />
            <Route exact path={'/stories/layout'} component={LayoutStoryView} />
            <Route
              exact
              path={'/stories/links-cta-ads'}
              component={LinkComponentStoryView}
            />
            <Route
              exact
              path={'/stories/wrap-up'}
              component={WrapUpStoryView}
            />
            <Route
              exact
              path={'/stories/millennials'}
              component={MillennialsStoryView}
            />
          </Switch>
        </React.Fragment>
      </ThemeProvider>
    );
  }
}

export default AppRoot;
