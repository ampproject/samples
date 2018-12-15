import * as React from 'react';
import styled from 'styled-components';

import {device} from '/util/device';
import AmpImage from '/component/amp/AmpImage';
import AmpCarousel from '/component/amp/AmpCarousel';
import Text from '/component/base/Text';
import SpacedContent from '/component/base/SpacedContent';
import MobilePadding from '/component/base/MobilePadding';

const CarouselContainer = styled.div`
  margin: 160px auto;
  position: relative;
  text-align: center;

  & amp-img > img {
    object-fit: contain;
  }

  & .amp-carousel-button {
    position: absolute;
    top: auto;
    right: auto;
    left: 10px;
    bottom: 20px;
    width: 50px;
    height: 50px;
    background: transparent;
    background-size: 50px;

    &.amp-disabled {
      opacity: 1;
      visibility: visible;
    }

    &.amp-carousel-button-next {
      left: calc(45% - 8.333%);
      transform: translateX(-100%);
      background: url('/static/sleep/arrow-right.svg');

      &.amp-disabled {
        background: url('/static/sleep/arrow-right-disabled.svg');
      }

      ${device.below.tabletLandscape`
        left: 50%;
        transform: translateX(25%);
      `}
    }

    &.amp-carousel-button-prev {
      left: calc(45% - 8.333%);
      transform: translateX(-240%);
      background: url('/static/sleep/arrow-left.svg');

      &.amp-disabled {
        background: url('/static/sleep/arrow-left-disabled.svg');
      }

      ${device.below.tabletLandscape`
        left: 50%;
        transform: translateX(-125%);
      `}
    }
  }
`;
const Slide = styled.div`
  display: flex;
  flex-direction: row;

  ${device.below.tabletLandscape`
    flex-direction: column-reverse;
  `}
`;
const CarouselContent = styled.div`
  width: 45%;
  margin: 0 8.333% 0 0;
  align-items: center;
  justify-content: center;
  text-align: right;

  ${device.below.tabletLandscape`
    width: 100%;
    max-width: 375px;
    margin: 0 auto;
    padding-bottom: 70px;
    text-align: center;
  `}
`;
CarouselContent.Col = styled.div`
  padding: 0 20px;
`;
const Accent = styled(Text.Accent)`
  font-size: 120px;

  ${device.below.tabletLandscape`
    font-size: 60px;
  `}
`;

class Slide1 extends React.Component {
  render() {
    return (
      <Slide>
        <CarouselContent>
          <MobilePadding>
            <SpacedContent f={4} header footer>
              <Accent style={{color: '#fff'}}>33%</Accent>
              <Text.Carousel style={{color: '#fff'}}>
                millenials sleep with their smartphone within reach
              </Text.Carousel>
            </SpacedContent>
          </MobilePadding>
        </CarouselContent>
        <AmpImage
          width="495"
          height="635"
          layout="intrinsic"
          src="/static/sleep/bed1@2x.png"
        />
      </Slide>
    );
  }
}

class Slide2 extends React.Component {
  render() {
    return (
      <Slide>
        <CarouselContent>
          <MobilePadding>
            <SpacedContent f={4} header footer>
              <Accent style={{color: '#fff'}}>50%</Accent>
              <Text.Carousel style={{color: '#fff'}}>
                admit to restless sleep the night before
              </Text.Carousel>
            </SpacedContent>
          </MobilePadding>
        </CarouselContent>
        <AmpImage
          width="495"
          height="635"
          layout="intrinsic"
          src="/static/sleep/bed2@2x.png"
        />
      </Slide>
    );
  }
}

class SleepCarousel extends React.Component {
  render() {
    return (
      <CarouselContainer style={this.props.style}>
        <AmpCarousel
          id="sleepCarouselLarge"
          width="900"
          height="663"
          layout="intrinsic"
          type="slides"
          controls
          hideFor={device.below.tabletLandscape}
          on="slideChange:AMP.setState({sleepCarousel: {index: event.index}})"
        >
          <Slide1 />
          <Slide2 />
          <Slide1 />
          <Slide2 />
        </AmpCarousel>

        <AmpCarousel
          id="sleepCarouselSmall"
          width="375"
          height="700"
          layout="fixed"
          type="slides"
          controls
          hideFor={device.above.tabletLandscape}
        >
          <Slide1 />
          <Slide2 />
          <Slide1 />
          <Slide2 />
        </AmpCarousel>
      </CarouselContainer>
    );
  }
}

export default SleepCarousel;
