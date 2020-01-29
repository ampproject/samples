import * as React from 'react';
import styled from 'styled-components';

export const AmpStory = styled(({className, ...rest}) => {
  return <amp-story class={className} {...rest} />;
})`
  html,
  body,
  * {
    font-family: 'Open Sans';
    font-weight: 700;
  }
`;

export default AmpStory;
