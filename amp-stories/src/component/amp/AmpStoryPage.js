import * as React from 'react';
import styled from 'styled-components';
import {omit} from 'ramda';

const AmpStoryPage = styled(({className, ...rest}) => {
  const realProps = omit(['backgroundColor'], rest);

  return <amp-story-page class={className} {...realProps} />;
})`
  background-color: ${({backgroundColor}) =>
    backgroundColor ? ({theme}) => theme.colors[backgroundColor] : 'white'};
`;

export default AmpStoryPage;
