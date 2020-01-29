import React from 'react';
import styled from 'styled-components';
import {rem} from 'polished';

import AmpStoryPage from '/component/amp/AmpStoryPage';

const backgroundSrcs = [
  {
    src: '/static/stories/story3/waveform.m3u8',
    type: 'application/x-mpegurl',
  },
  {
    src: '/static/stories/story3/waveform.mp4',
    type: 'video/mp4',
  },
];

const Text = styled.div`
  font-size: ${rem(60)};
  font-weight: 700;
  color: ${({theme}) => theme.colors.storiesLightBlue};
`;

const DocsButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  &:active,
  &:hover,
  &:link,
  &:visited,
  & {
    color: white;
    font-weight: 700;
  }

  font-size: ${rem(16)};
  background-color: ${({theme}) => theme.colors.storiesLightBlue};
  border: 2px solid ${({theme}) => theme.colors.storiesLightBlue};
  height: 54px;
`;

const StoryPage8 = () => (
  <AmpStoryPage id="audio" backgroundColor="storiesBkLightBlue">
    <amp-story-grid-layer template="fill">
      <amp-video
        id="waveform"
        layout="fill"
        autoplay=""
        loop=""
        width="720px"
        height="1280px"
        poster="/static/stories/story3/waveform.png"
      >
        {backgroundSrcs.map(({src, type}) => (
          <source key={src} src={src} type={type} />
        ))}
      </amp-video>
    </amp-story-grid-layer>
    <amp-story-grid-layer template="vertical" style={{alignContent: 'end'}}>
      <Text>
        Or add
        <br />
        audio
        <br />
        content
      </Text>
      <DocsButton href="https://amp.dev/documentation/components/amp-audio/?format=stories">
        Read our documentation
      </DocsButton>
    </amp-story-grid-layer>
  </AmpStoryPage>
);

export default StoryPage8;
