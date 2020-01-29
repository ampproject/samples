import * as React from 'react';
import styled from 'styled-components';
import {omit} from 'ramda';

const AmpImage = styled(({className, ...rest}) => {
  const realProps = omit(['hideFor'], rest);

  if (!rest.layout) {
    throw new Error('AmpImage component missing attribute `layout`');
  }

  return <amp-img class={className} {...realProps} />;
})`
  ${({hideFor}) => (hideFor ? hideFor`display: none;` : '')};
`;

export default AmpImage;
