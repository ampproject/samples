import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {rem} from 'polished';
import AmpImage from '/component/amp/AmpImage';
import {omit} from 'ramda';

const Pill = styled((props) => {
  const rest = omit(['color', 'backgroundColor'], props);
  return <div {...rest} />;
})`
  padding: 8px 16px;
  height: 44px;
  width: fit-content;
  background-color: ${({backgroundColor}) =>
    backgroundColor ? ({theme}) => theme.colors[backgroundColor] : 'white'};
  font-size: ${rem(16)};
  color: white;
  border-radius: 22px;
  color: white;
  display: flex;
  align-items: center;
`;

const LightningBolt = styled(AmpImage)`
  margin-right: 4.5px;
  opacity: 0.9;
`;

export const BehindTheStoryPill = ({className, color}) => (
  <Pill className={className} backgroundColor={color}>
    <LightningBolt
      layout="fixed"
      src="/static/stories/lightningBolt.svg"
      width="16"
      height="28"
    />
    Behind The Story
  </Pill>
);

const Text = styled((props) => {
  const rest = omit(['color', 'backgroundColor'], props);
  return <div {...rest} />;
})`
  font-size: ${rem(32)};
  font-weight: 700;
  line-height: 1.34;
  color: ${({color}) => ({theme}) => theme.colors[color]};
`;

const AmpStoryIntro = ({backgroundSrcs, posterSrc, title, color}) => (
  <React.Fragment>
    <amp-story-grid-layer template="fill">
      <amp-video
        layout="fill"
        loop=""
        autoplay=""
        poster={posterSrc}
        width="720"
        height="1280"
        noaudio=""
      >
        {backgroundSrcs.map(({src, type}) => (
          <source key={src} src={src} type={type} />
        ))}
      </amp-video>
    </amp-story-grid-layer>
    <amp-story-grid-layer template="vertical" style={{alignContent: 'end'}}>
      <BehindTheStoryPill color={color} />
      <Text color={color}>{title}</Text>
    </amp-story-grid-layer>
  </React.Fragment>
);

AmpStoryIntro.protoTypes = {
  backgroundSrcs: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
      type: PropTypes.type,
    }),
  ),
  posterSrc: PropTypes.string,
  title: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default AmpStoryIntro;
