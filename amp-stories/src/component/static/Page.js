// Import modules ==============================================================
import * as React from 'react';

const getLanguageFromLocale = (locale) => {
  const [language] = locale.split('-');
  return language;
};

class Page extends React.PureComponent {
  render() {
    const {markup, head, locale} = this.props;
    const lang = getLanguageFromLocale(locale);
    return (
      <html className="amp-tutorial" amp="true" lang={lang}>
        <head>
          <link
            rel="icon"
            type="image/png"
            href="/static/article/favicon.png"
          />
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1"
            name="viewport"
          />
          <meta content="yes" name="apple-mobile-web-app-capable" />
          {head}
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900"
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
            __html: markup,
          }}
        />
      </html>
    );
  }
}

export default Page;
