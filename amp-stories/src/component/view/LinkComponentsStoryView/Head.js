import React from 'react';
import {Helmet} from 'react-helmet';

const LdJson = {
  headline: 'Behind the Story: Links, CTAs, and Ads',
  image: ['/static/stories/story5/thumbnail.png'],
};

const Head = () => (
  <Helmet>
    <title>Links, CTAs, and Ads | Behind the Story</title>
    <script
      async
      custom-element="amp-story"
      src="https://cdn.ampproject.org/v0/amp-story-1.0.js"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap"
      rel="stylesheet"
    />
    <script type="application/ld+json">{`${JSON.stringify(LdJson)}`}</script>
    <script
      async
      custom-element="amp-video"
      src="https://cdn.ampproject.org/v0/amp-video-0.1.js"
    />
  </Helmet>
);

export default Head;
