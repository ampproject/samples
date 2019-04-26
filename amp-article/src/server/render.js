// Import modules ==============================================================
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {ServerStyleSheet, StyleSheetManager} from 'styled-components';
import urlJoin from 'url-join';

import Page from '/component/static/Page';
import AppRoot from '/component/root/AppRoot';
import SidebarRoot from '/component/root/SidebarRoot';

import CleanCSS from 'clean-css';

const renderPage = (props) => {
  return ReactDOMServer.renderToStaticMarkup(
    <Page rootElementId={AppRoot.rootElementId} {...props} />,
  );
};

const cssCleaner = new CleanCSS({
  level: {
    1: {
      all: true,
      roundingPrecision: 5,
      transform: (name, value) => {
        // ULTIMATE CSS SPACE SAVINGS FOR AMP CSS LIMIT!
        // May or may not break browsers. Please convince AMP friends
        // to not count prefixed properties/values against the mighty
        // byte limit.
        if (
          /^-(webkit|moz|ms)/.exec(name) ||
          (/^-(webkit|moz|ms)/.exec(value) && !/sticky/.exec(value))
        ) {
          return false;
        }
        return value;
      },
    },
    2: {
      all: true,
      removeUnusedAtRules: false,
    },
  },
});

const formatStyleElements = (elems) => {
  return elems.map((elem) => {
    const css = elem.props.dangerouslySetInnerHTML.__html
      .replace(/\/\*[^*]+\*\//g, '')
      .replace(/\}[\n\r\s]+(\S)/gm, (_, v) => `}${v}`)
      .trim();
    const result = cssCleaner.minify(css.toString());
    const out = result.styles;
    return out;
  });
};

const render = async ({path, locale}) => {
  const sheet = new ServerStyleSheet();
  const routerContext = {};
  const webUrl = process.env.WEB_URL || 'http://localhost';

  const markup = ReactDOMServer.renderToStaticMarkup(
    <StaticRouter location={path} context={routerContext}>
      <StyleSheetManager sheet={sheet.instance}>
        <AppRoot locale={locale} />
      </StyleSheetManager>
    </StaticRouter>,
  );

  const sidebarMarkup = ReactDOMServer.renderToStaticMarkup(
    <StyleSheetManager sheet={sheet.instance}>
      <SidebarRoot locale={locale} />
    </StyleSheetManager>,
  );

  const [headCss, animationsCss] = formatStyleElements(sheet.getStyleElement());

  const page = renderPage({
    locale,
    head: (
      <React.Fragment>
        <link rel="canonical" href={urlJoin(webUrl, path)} />
        <style amp-custom="" dangerouslySetInnerHTML={{__html: headCss}} />
      </React.Fragment>
    ),
    footer: (
      <React.Fragment>
        <style
          amp-keyframes=""
          dangerouslySetInnerHTML={{__html: animationsCss}}
        />
      </React.Fragment>
    ),
    markup,
    sidebarMarkup,
  });
  return {
    status: 200,
    markup: `<!DOCTYPE html>${page}`,
    headers: {
      'Content-Language': locale,
      'Content-Type': 'text/html; charset=utf-8',
    },
  };
};

export default render;
