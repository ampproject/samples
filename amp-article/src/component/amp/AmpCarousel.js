import * as React from 'react';
import styled from 'styled-components';

const AmpCarousel = styled(({className, hideFor: _h, ...rest}) => {
  if (!rest.layout) {
    throw new Error('AmpCarousel component missing attribute `layout`');
  }

  return <amp-carousel class={className} {...rest} />;
})`
  ${({hideFor}) => (hideFor ? hideFor`display: none;` : '')};
`;

export default AmpCarousel;
