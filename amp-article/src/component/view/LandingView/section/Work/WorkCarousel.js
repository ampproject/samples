/**
 * DEPRECATED
 * Carousel example
 */
import * as React from 'react';
import styled from 'styled-components';

import Text from '/component/base/Text';

const CarouselContainer = styled.div`
  margin: 160px 0;
`;
const Slide = styled.div`
  padding: 0 12px;
`;
const CarouselContent = styled.div`
  display: flex;
  padding: 40px 0px 0 0;
  align-items: center;
  justify-content: center;
`;
CarouselContent.Col = styled.div`
  padding: 0 20px;
`;

const SpacerCol = styled.div`
  width: 25%;
`;

class Slide1 extends React.Component {
  render() {
    return (
      <Slide>
        <amp-img
          width="583"
          height="371"
          layout="fixed"
          src="/static/work/slide1.svg"
        />
        <CarouselContent>
          <CarouselContent.Col>
            <Text.Accent color="flushOrange">43%</Text.Accent>
          </CarouselContent.Col>
          <CarouselContent.Col>
            <Text color="flushOrange">
              plan to leave their job
              <br />
              within two years
            </Text>
          </CarouselContent.Col>
        </CarouselContent>
      </Slide>
    );
  }
}

class Slide2 extends React.Component {
  render() {
    return (
      <Slide>
        <amp-img
          width="405"
          height="367"
          layout="fixed"
          src="/static/work/slide2.svg"
        />
        <CarouselContent>
          <CarouselContent.Col>
            <Text.Accent color="flushOrange">30%</Text.Accent>
          </CarouselContent.Col>
          <CarouselContent.Col>
            <Text color="flushOrange">
              plan to leave their job
              <br />
              within two years
            </Text>
          </CarouselContent.Col>
        </CarouselContent>
      </Slide>
    );
  }
}

class WorkCarousel extends React.Component {
  render() {
    return (
      <CarouselContainer>
        <amp-carousel height="600" layout="fixed-height" type="carousel">
          <SpacerCol />
          <Slide1 />
          <Slide2 />
          <Slide1 />
          <Slide2 />
          <SpacerCol />
        </amp-carousel>
      </CarouselContainer>
    );
  }
}

export default WorkCarousel;
