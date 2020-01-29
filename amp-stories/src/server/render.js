// Import modules ==============================================================
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {ServerStyleSheet, StyleSheetManager} from 'styled-components';
import {html as beautifyHtml} from 'js-beautify';
import CleanCSS from 'clean-css';
import urlJoin from 'url-join';
import Helmet from 'react-helmet';

import Page from '/component/static/Page';
import AppRoot from '/component/root/AppRoot';

const renderPage = (props) => {
  return ReactDOMServer.renderToStaticMarkup(
    <Page rootElementId={AppRoot.rootElementId} {...props} />,
  );
};

const minifyCss = (styleSheet) => {
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
            process.env.DISABLE_PREFIXES &&
            (/^-(webkit|moz|ms)/.exec(name) ||
              (/^-(webkit|moz|ms)/.exec(value) && !/sticky/.exec(value)))
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

  const [headCss, animationsCss] = formatStyleElements(
    styleSheet.getStyleElement(),
  );
  return `${animationsCss}${headCss}`;
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

  //
  // Configure Head Elements
  // ---------------------------------------------------------------------------
  // Each view defines their own elements within the <head> tag. We use the
  // Helmet library to set this statically on render.
  const {title, script, link} = Helmet.renderStatic();

  const styles = process.env.MINIFY_MARKUP
    ? minifyCss(sheet)
    : sheet.getStyleTags().replace(/<style.*>|<\/style>/g, '');

  const headStyles = (
    <style amp-custom="" dangerouslySetInnerHTML={{__html: `${styles}`}} />
  );

  //
  // Render Page
  // ---------------------------------------------------------------------------
  const page = renderPage({
    locale,
    head: (
      <React.Fragment>
        {title.toComponent()}
        {script.toComponent()}
        {link.toComponent()}
        <link rel="canonical" href={urlJoin(webUrl, path)} />
        {headStyles}
      </React.Fragment>
    ),
    markup,
  });
  return {
    status: 200,
    markup: `<!DOCTYPE html>${
      process.env.MINIFY_MARKUP ? page : beautifyHtml(page)
    }`,
    headers: {
      'Content-Language': locale,
      'Content-Type': 'text/html; charset=utf-8',
    },
  };
};

export default render;
