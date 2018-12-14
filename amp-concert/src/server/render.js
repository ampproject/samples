// Import modules ==============================================================
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {ServerStyleSheet, StyleSheetManager} from 'styled-components';
import urlJoin from 'url-join';

import Page from '/component/static/Page';
import AppRoot from '/component/root/AppRoot';
import Config from '/component/context/Config';
import SidebarRoot from '/component/root/SidebarRoot';
import {getReviews} from './data';

/**
 * The jank begins. All this is here because of the limits AMP places on CSS.
 * We basically blast out anything to do with SC including its comments and
 * annotations and combine all the SC elements together into one giga-element
 * and slap on the required AMP attributes.
 * @param {Array<React.Node>} elems The stylesheet nodes from SC.
 * @returns {String} CSS.
 */
const formatStyleElement = (elems) => {
  const out = elems
    .map((elem) => {
      return elem.props.dangerouslySetInnerHTML.__html;
    })
    .join('')
    .replace(/\/\*[^*]+\*\//g, '')
    .replace(/\}[\n\r\s]+(\S)/gm, (_, v) => `}${v}`)
    .trim();
  return <style amp-custom="" dangerouslySetInnerHTML={{__html: out}} />;
};

const renderPage = (props) => {
  return ReactDOMServer.renderToStaticMarkup(
    <Page rootElementId={AppRoot.rootElementId} {...props} />,
  );
};

const render = async ({path, locale, country}) => {
  const sheet = new ServerStyleSheet();
  const webUrl = process.env.WEB_URL || 'http://localhost:8080';
  const routerContext = {};

  // Use for AMP components that require an absolute URL like the calendar
  // instead of just using `/foo`.
  const config = {webUrl};

  // FIXME: This is hard-coded because the app has no real state
  // management or data-dependency/fetching mechanism. In the future
  // I expect something like https://codesandbox.io/s/88zo9vo8y2
  let reviews = [];
  if (process.env.NODE_ENV !== 'test') {
    reviews = await getReviews();
  } else {
    reviews = [{postedAt: new Date(), id: 'foo'}];
  }

  const markup = ReactDOMServer.renderToStaticMarkup(
    <StaticRouter location={path} context={routerContext}>
      <StyleSheetManager sheet={sheet.instance}>
        <Config.Provider value={config}>
          <AppRoot locale={locale} />
        </Config.Provider>
      </StyleSheetManager>
    </StaticRouter>,
  );

  const sidebarMarkup = ReactDOMServer.renderToStaticMarkup(
    <StyleSheetManager sheet={sheet.instance}>
      <Config.Provider value={config}>
        <SidebarRoot locale={locale} reviews={reviews} />
      </Config.Provider>
    </StyleSheetManager>,
  );

  const page = renderPage({
    locale,
    head: (
      <React.Fragment>
        <link rel="canonical" href={urlJoin(webUrl, path)} />
        {formatStyleElement(sheet.getStyleElement())}
      </React.Fragment>
    ),
    markup: sidebarMarkup + markup,
    country,
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
