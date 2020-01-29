import React from 'react';
import styled from 'styled-components';
import AmpStoryPage from '/component/amp/AmpStoryPage';
import {TextHighlightBanner} from '../shared';
import {BannerWrapper} from '/component/base/TextHighlight';

const BaseLayer = styled((props) => <div {...props} />)`
  grid-row-start: upper-third;
  grid-row-end: middle-third;
  align-self: center;
  justify-self: center;
  display: grid;
  justify-items: center;
  align-items: center;
  margin-left: -32px;
  margin-right: -32px;
`;

// We can't pass styled props to the div or the amp linter will fail, so we
// utilize alias props to hide them from the rest
const Square = styled(
  ({borderSize: _b, size: _s, radius: _r, borderSize: _bs, ...rest}) => (
    <div {...rest} />
  ),
)`
  width: ${({size}) => size};
  height: ${({size}) => size};
  border-radius: ${({radius}) => radius};
  border: ${({borderSize}) => borderSize} solid
    ${({theme}) => theme.colors.storiesOrange};
  grid-area: 1 / 1 / 1 / 1;
`;

const CopyContainer = styled((props) => <div {...props} />)`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
`;

const Page = styled((props) => <AmpStoryPage {...props} />)``;

const StoryPage2 = () => (
  <Page id="out-of-the-box" backgroundColor="storiesBkOrange">
    <amp-story-grid-layer template="thirds">
      <BaseLayer>
        <Square
          animate-in="twirl-in"
          animate-in-duration="2s"
          animate-in-timing-function="cubic-bezier(0.42, 0,0.58,1)"
          size="294px"
          borderSize="24px"
          radius="100px"
        />
        <Square
          animate-in="twirl-in"
          animate-in-duration="1.5s"
          animate-in-timing-function="cubic-bezier(0.42, 0,0.58,1)"
          size="206px"
          borderSize="20px"
          radius="69px"
        />
        <Square
          animate-in="twirl-in"
          animate-in-duration="1s"
          animate-in-timing-function="cubic-bezier(0.42, 0,0.58,1)"
          size="126px"
          borderSize="20px"
          radius="36px"
        />
        <Square
          animate-in="twirl-in"
          animate-in-duration="0.5s"
          animate-in-timing-function="cubic-bezier(0.42, 0,0.58,1)"
          size="51px"
          borderSize="16px"
          radius="8px"
        />
      </BaseLayer>
      <CopyContainer grid-area="lower-third">
        <BannerWrapper>
          <TextHighlightBanner>AMP supports</TextHighlightBanner>
          <TextHighlightBanner>animations out of</TextHighlightBanner>
          <TextHighlightBanner>the box</TextHighlightBanner>
        </BannerWrapper>
      </CopyContainer>
    </amp-story-grid-layer>
  </Page>
);

export default StoryPage2;
