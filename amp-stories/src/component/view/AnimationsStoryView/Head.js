import React from 'react';
import {Helmet} from 'react-helmet';

const LdJson = {
  headline: 'Behind the Story: AMP Animations',
  image: ['/static/stories/story2/thumbnail.png'],
};

const Head = () => (
  <Helmet>
    <title>Animations | Behind the Story</title>
    <script
      async
      custom-element="amp-story"
      src="https://cdn.ampproject.org/v0/amp-story-1.0.js"
    />
    <script
      async
      custom-element="amp-video"
      src="https://cdn.ampproject.org/v0/amp-video-0.1.js"
    />
    <script type="application/ld+json">{`${JSON.stringify(LdJson)}`}</script>
    <link
      href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap"
      rel="stylesheet"
    />
  </Helmet>
);

export default Head;
