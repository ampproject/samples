import * as React from 'react';
import styled from 'styled-components';

const AmpLightbox = styled(({className, hideFor: _h, ...rest}) => {
  return <amp-lightbox class={className} {...rest} />;
})`
  ${({hideFor}) => (hideFor ? hideFor`display: none;` : '')};
`;

export default AmpLightbox;
