import React from 'react';
import styled from 'styled-components';
import {rem} from 'polished';
import {TextHighlightBanner as SharedHighlightBanner} from '/component/base/TextHighlight';

export const Text = styled.div`
  font-size: ${rem(32)};
  font-weight: 700;
  color: ${({theme}) => theme.colors.storiesGreen};
`;

export const TextHighlightBanner = styled(SharedHighlightBanner).attrs({
  color: 'storiesBkGreen',
  backgroundColor: 'storiesGreen',
})`
  font-size: ${rem(55)};
  font-weight: 700;
`;

export const ZoomFadeAnimation = ({
  duration = '0.4s',
  delay = '0s',
  timing = 'ease-in-out',
  width,
  height,
  children,
}) => {
  return (
    <div
      animate-in="fade-in"
      animate-in-duration={duration}
      animate-in-delay={delay}
      animate-in-timing-function={timing}
      style={{gridArea: '1 / 1 / 1 / 1'}}
    >
      <div
        animate-in="zoom-out"
        animate-in-duration={duration}
        animate-in-delay={delay}
        animate-in-timing-function={timing}
        scale-start="2"
        scale-end="1"
        style={{width, height}}
      >
        {children}
      </div>
    </div>
  );
};

export const BoxPileContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  position: relative;
`;

export const HighlightPileContainer = styled(BoxPileContainer)`
  align-items: center;
  height: 100%;
`;

export const NoEdgeThirdsLayer = styled(({className, ...rest}) => (
  <amp-story-grid-layer class={className} template="thirds" {...rest} />
))`
  padding: 0;
`;

export const PaddedUpperThird = styled.div`
  padding: 32px 32px 0;
`;

export const FillGrid = styled.div`
  grid-area: 1 / 1 / 1 / 1;
`;
