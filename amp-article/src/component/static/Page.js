// Import modules ==============================================================
import * as React from 'react';
import ReactDOMServer from 'react-dom/server';

const getLanguageFromLocale = (locale) => {
  const [language] = locale.split('-');
  return language;
};

class Page extends React.PureComponent {
  render() {
    const {markup, sidebarMarkup, head, footer, locale} = this.props;
    const lang = getLanguageFromLocale(locale);
    return (
      <html amp="true" lang={lang}>
        <head>
          <title>Mood | Breaking the Status Quo</title>
          <link rel="icon" type="image/png" href="/static/favicon.png" />
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1"
            name="viewport"
          />
          <meta content="yes" name="apple-mobile-web-app-capable" />
          {head}
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:100,300,400"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Oswald:300,700"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Abril+Fatface"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono:400"
            rel="stylesheet"
          />
          <script async src="https://cdn.ampproject.org/v0.js" />
          <script
            async
            custom-element="amp-bind"
            src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
          />
          <script
            async
            custom-element="amp-list"
            src="https://cdn.ampproject.org/v0/amp-list-0.1.js"
          />
          <script
            async
            custom-template="amp-mustache"
            src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js"
          />
          <script
            async
            custom-element="amp-sidebar"
            src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"
          />
          <script
            async
            custom-element="amp-access"
            src="https://cdn.ampproject.org/v0/amp-access-0.1.js"
          />
          <script
            async
            custom-element="amp-analytics"
            src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
          />
          <script
            async
            custom-element="amp-selector"
            src="https://cdn.ampproject.org/v0/amp-selector-0.1.js"
          />
          <script
            async
            custom-element="amp-live-list"
            src="https://cdn.ampproject.org/v0/amp-live-list-0.1.js"
          />
          <script
            async
            custom-element="amp-fit-text"
            src="https://cdn.ampproject.org/v0/amp-fit-text-0.1.js"
          />
          <script
            async
            custom-element="amp-social-share"
            src="https://cdn.ampproject.org/v0/amp-social-share-0.1.js"
          />
          <script
            async
            custom-element="amp-position-observer"
            src="https://cdn.ampproject.org/v0/amp-position-observer-0.1.js"
          />
          <script
            async
            custom-element="amp-animation"
            src="https://cdn.ampproject.org/v0/amp-animation-0.1.js"
          />
          <script
            async
            custom-element="amp-youtube"
            src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"
          />
          <script
            async
            custom-element="amp-orientation-observer"
            src="https://cdn.ampproject.org/v0/amp-orientation-observer-0.1.js"
          />
          <script
            async
            custom-element="amp-carousel"
            src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"
          />
          <script
            async
            custom-element="amp-accordion"
            src="https://cdn.ampproject.org/v0/amp-accordion-0.1.js"
          />
          <script
            async
            custom-element="amp-twitter"
            src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"
          />
          <script
            async
            custom-element="amp-instagram"
            src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"
          />
          <script
            async
            custom-element="amp-lightbox"
            src="https://cdn.ampproject.org/v0/amp-lightbox-0.1.js"
          />
          <script
            async
            custom-element="amp-video"
            src="https://cdn.ampproject.org/v0/amp-video-0.1.js"
          />
          <style
            amp-boilerplate=""
            dangerouslySetInnerHTML={{
              __html:
                'body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}',
            }}
          />
          <noscript>
            <style
              amp-boilerplate=""
              dangerouslySetInnerHTML={{
                __html:
                  'body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}',
              }}
            />
          </noscript>
        </head>
        <body
          dangerouslySetInnerHTML={{
            __html:
              markup +
              sidebarMarkup +
              ReactDOMServer.renderToStaticMarkup(footer),
          }}
        />
      </html>
    );
  }
}

export default Page;
