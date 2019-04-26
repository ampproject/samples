// Import modules ==============================================================
import * as React from 'react';
import classNames from 'classnames';

const getLanguageFromLocale = (locale) => {
  const [language] = locale.split('-');
  return language;
};

class Page extends React.PureComponent {
  render() {
    const {markup, head, locale, country} = this.props;
    const lang = getLanguageFromLocale(locale);
    return (
      <html amp="true" lang={lang}>
        <head>
          <title>Olga & the Kings</title>
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
            href="https://fonts.googleapis.com/css?family=Limelight"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Poppins:100,400,500,700,800,900"
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
            custom-element="amp-date-picker"
            src="https://cdn.ampproject.org/v0/amp-date-picker-0.1.js"
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
            custom-element="amp-3d-gltf"
            src="https://cdn.ampproject.org/v0/amp-3d-gltf-0.1.js"
          />
          <script
            async
            custom-element="amp-live-list"
            src="https://cdn.ampproject.org/v0/amp-live-list-0.1.js"
          />
          <script
            async
            custom-element="amp-geo"
            src="https://cdn.ampproject.org/v0/amp-geo-0.1.js"
          />
          <script
            async
            custom-element="amp-timeago"
            src="https://cdn.ampproject.org/v0/amp-timeago-0.1.js"
          />
          <script
            async
            custom-element="amp-form"
            src="https://cdn.ampproject.org/v0/amp-form-0.1.js"
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
            custom-element="amp-pan-zoom"
            src="https://cdn.ampproject.org/v0/amp-pan-zoom-0.1.js"
          />
          <script
            id="amp-access"
            type="application/json"
            dangerouslySetInnerHTML={{
              __html: `
              {
                "authorization":
                    "/api/amp-access.json?rid=READER_ID&url=SOURCE_URL",
                "pingback":
                    "/api/amp-ping.json?rid=READER_ID&url=SOURCE_URL",
                "login": {
                  "signIn": "/account/login",
                  "signOut": "/account/logout"
                },
                "authorizationFallbackResponse": {"error": true}
              }
            `,
            }}
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
          className={classNames(country && `amp-iso-country-${country}`)}
          dangerouslySetInnerHTML={{__html: markup}}
        />
      </html>
    );
  }
}

export default Page;
