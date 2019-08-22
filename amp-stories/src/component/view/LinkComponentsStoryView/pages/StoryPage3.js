import React from 'react';
import styled, {keyframes} from 'styled-components';

import {TextHighlightBanner, Button as SharedButton} from '../shared';
import {BannerWrapper} from '/component/base/TextHighlight';
import AmpStoryPage from '/component/amp/AmpStoryPage';
import AmpImage from '/component/amp/AmpImage';

const tada = keyframes`
  from {
    transform: scale3d(1, 1, 1);
  }

  10%,
  20% {
    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
  }

  30%,
  50%,
  70%,
  90% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
  }

  40%,
  60%,
  80% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
`;

const rotate = keyframes`
  from {
    transform: translate(-63%, -7%) rotate(0deg);
  }
  to {
    transform: translate(-63%, -7%) rotate(360deg);
  }
`;

const Button = styled(SharedButton)`
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px;
`;

const trajectory = (rotate, translate) => keyframes`
from {
  opacity: 0
}
50% {
  opacity: 1;
}
to {
  transform: rotate(${rotate}) translate(${translate},0);
  opacity: 0;
}
`;

const Exploder = styled.div`
  width: 15px
  height: 5px;
  position: absolute;
  background-color: ${({theme}) => theme.colors.storiesLolliPink};
  border-radius: 25%;
  right: 158px;
  bottom: 187px;
`;

const Exploder1 = styled(Exploder)`
  opacity: 0;
  transform: rotate(45deg) translate(0, 0);
  [active] & {
    animation: ${trajectory('45deg', '-70px')} 0.3s 0.3s ease-out forwards;
  }
`;

const Exploder2 = styled(Exploder)`
  opacity: 0;
  transform: rotate(-10deg) translate(0, 0);
  [active] & {
    animation: ${trajectory('-10deg', '-50px')} 0.3s 0.3s ease-out forwards;
  }
`;

const Exploder3 = styled(Exploder)`
  opacity: 0;
  transform: rotate(100deg) translate(0, 0);
  [active] & {
    animation: ${trajectory('100deg', '-60px')} 0.3s 0.3s ease-out forwards;
  }
`;

const draw = keyframes`
to {
  stroke-dashoffset: 0;
}
`;

const Arrow = styled((props) => (
  <svg
    width="184px"
    height="202px"
    viewBox="0 0 184 202"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="HiFi-v3"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
    >
      <g id="5C" transform="translate(-176.000000, -394.000000)">
        <g
          id="Group-3"
          transform="translate(196.000000, 280.000000)"
          stroke="#FF4F89"
          strokeWidth="40"
        >
          <path
            d="M334.343528,376.290966 C364.212765,88.6133172 291.433577,-20.5588405 116.005963,48.7744929"
            id="Path-4"
            transform="translate(228.434067, 202.434067) rotate(-225.000000) translate(-228.434067, -202.434067) "
          />
          <polyline
            id="Path-5"
            strokeLinejoin="round"
            transform="translate(41.711841, 172.500000) scale(-1, 1) rotate(-360.000000) translate(-41.711841, -172.500000) "
            points="-5.68434189e-14 134 83.4236811 134 83.4236811 211"
          />
        </g>
      </g>
    </g>
  </svg>
))`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 3;
  [active] & path,
  [active] & polyline {
    stroke-dasharray: 1000;
    stroke-dashoffset: -1000;
    animation: ${draw} 0.3s linear forwards;
  }
`;

const Curve = styled(AmpImage).attrs({
  src: '/static/stories/story5/curve.svg',
  layout: 'fixed',
  width: '434px',
  height: '187px',
})`
  position: absolute;
  left: 0;
  bottom: 0;
  transform: translate(-63%, -7%) rotate(0deg);
`;

const Page = styled((props) => <AmpStoryPage {...props} />)`
  &[active] ${Button} {
    animation: ${tada} 0.5s 0.3s ease-in-out;
  }
  &[active] ${Curve} {
    animation: ${rotate} 8s linear infinite;
  }
`;

const StoryPage3 = () => (
  <Page id="click-cta" backgroundColor="storiesBkLolliPink">
    <amp-story-grid-layer template="fill">
      <div>
        <Exploder1 />
        <Exploder2 />
        <Exploder3 />
        <Arrow />
        <Curve />
      </div>
    </amp-story-grid-layer>
    <amp-story-grid-layer template="vertical">
      <BannerWrapper>
        <TextHighlightBanner>And your CTAs</TextHighlightBanner>
        <TextHighlightBanner>can live</TextHighlightBanner>
        <TextHighlightBanner>anywhere on</TextHighlightBanner>
        <TextHighlightBanner>your pages</TextHighlightBanner>
      </BannerWrapper>
    </amp-story-grid-layer>
    <amp-story-grid-layer template="fill">
      <ButtonWrapper>
        <Button href="https://amp.dev/about/stories/">You can click me</Button>
      </ButtonWrapper>
    </amp-story-grid-layer>
  </Page>
);

export default StoryPage3;
