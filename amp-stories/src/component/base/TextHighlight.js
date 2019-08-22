import * as React from 'react';
import styled from 'styled-components';
import {rem} from 'polished';
import {omit} from 'ramda';

export const TextHighlight = styled((props) => {
  const realProps = omit(['color', 'backgroundColor'], props);
  return <span {...realProps} />;
})`
  display: inline-block;
  padding: 0px 10px;
  color: ${({color}) => (color ? ({theme}) => theme.colors[color] : '')};
  background-color: ${({backgroundColor}) =>
    backgroundColor ? ({theme}) => theme.colors[backgroundColor] : ''};
`;

export const TextHighlightBanner = styled((props) => {
  return <TextHighlight {...props} />;
})`
  font-size: ${rem(32)};
  line-height: 1.34;
  font-weight: 700;
`;

export const BannerWrapper = styled.div`
  & > * {
    margin-bottom: 3px;
    display: block;
    width: fit-content;
  }
`;

export default TextHighlight;
