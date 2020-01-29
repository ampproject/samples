import React from 'react';
import styled, {keyframes} from 'styled-components';
import {rem} from 'polished';

import {TextHighlightBanner} from '../shared';
import {BannerWrapper} from '/component/base/TextHighlight';
import AmpImage from '/component/amp/AmpImage';
import AmpStoryPage from '/component/amp/AmpStoryPage';

const SvgContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;
const Splash = styled((props) => (
  <AmpImage
    layout="fixed"
    width="315px"
    height="372px"
    src="/static/stories/story3/3F-splash.svg"
    {...props}
  />
))`
  position: absolute;
  bottom: -14px;
  left: 32px;
  z-index: 2;
`;

const draw = keyframes`
to {
  stroke-dashoffset: 0;
}
`;

const Curve = styled((props) => (
  <svg
    width="197px"
    height="168px"
    viewBox="0 0 197 168"
    version="1.1"
    {...props}
  >
    <title>Path 4</title>
    <desc>Created with Sketch.</desc>
    <g
      id="HiFi-v3"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
    >
      <g
        id="3I"
        transform="translate(0.000000, -467.000000)"
        stroke="#4BC3FF"
        strokeWidth="20"
      >
        <path
          d="M102.688004,672.150943 C132.557241,384.473294 59.7780527,275.301136 -115.649561,344.63447"
          id="Path-4"
          transform="translate(-3.221457, 498.294044) scale(-1, -1) rotate(-60.000000) translate(3.221457, -498.294044) "
        />
      </g>
    </g>
  </svg>
))`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 3;
  [active] & path {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: ${draw} 0.3s linear forwards;
  }
`;

const Circle = styled((props) => <div {...props} />)`
  border-radius: 100%;
  width: 200px;
  height: 200px;
  background-color: #dcf4ff;
  position: absolute;
  bottom: 64px;
  left: 86px;
  z-index: 1;
`;
const Text = styled((props) => <TextHighlightBanner {...props} />)`
  font-size: ${rem(30)};
`;

const AnimatedText = ({delay, children, ...rest}) => {
  return (
    <div
      animate-in="fly-in-top"
      animate-in-duration="0.3s"
      animate-in-delay={delay}
      animate-in-timing-function="ease-in-out"
    >
      <div
        animate-in="fade-in"
        animate-in-duration="0.25s"
        animate-in-delay={delay}
        animate-in-timing-function="ease-in-out"
      >
        <Text {...rest}>{children}</Text>
      </div>
    </div>
  );
};

const StoryPage9 = () => (
  <AmpStoryPage id="splash" backgroundColor="storiesBkLightBlue">
    <amp-story-grid-layer template="fill">
      <SvgContainer>
        <Splash
          animate-in="zoom-in"
          scale-start="0.001"
          scale-end="1"
          animate-in-timing-function="cubic-bezier(0,1.34,.16,1.13)"
          animate-in-duration="10s"
          animate-in-delay="0.45s"
        />
        <Circle
          animate-in="zoom-in"
          scale-start="0.001"
          scale-end="1"
          animate-in-timing-function="cubic-bezier(0,1.34,.16,1.13)"
          animate-in-duration="10s"
          animate-in-delay="0.4s"
        />
        <Curve />
      </SvgContainer>
    </amp-story-grid-layer>
    <amp-story-grid-layer template="vertical">
      <BannerWrapper>
        <AnimatedText>So almost all your</AnimatedText>
        <AnimatedText delay="0.2s">readers' sense are</AnimatedText>
        <AnimatedText delay="0.4s">awaken</AnimatedText>
      </BannerWrapper>
    </amp-story-grid-layer>
  </AmpStoryPage>
);

export default StoryPage9;
