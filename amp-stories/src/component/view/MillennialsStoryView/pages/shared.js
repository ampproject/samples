import * as React from 'react';
import styled from 'styled-components';
import {rem} from 'polished';

// eslint-disable-next-line metalab/jsx-a11y/heading-has-content
export const HeadingSerif = styled((props) => <h1 {...props} />)`
  color: ${({theme}) => theme.colors.white};
  font-family: 'IBM Plex Serif';
  font-size: ${rem(40)};
  font-weight: 800;
`;

export const AbsoluteContainer = styled.div`
  height: 100%;
  position: absolute;
  top: 0;
  width: 100%;
`;

export const Underline = styled.span`
  border-bottom: ${rem(2)} solid #ffe351;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
`;

export const Text = styled.p`
  color: ${({theme}) => theme.colors.white};
  font-family: Roboto;
  font-size: ${rem(30)};
  font-weight: 300;
  line-height: 1.15;
`;

export const FancyHeading = styled((props) => <HeadingSerif {...props} />)`
  text-shadow: ${rem(-4)} ${rem(4)} rgb(0, 0, 0, 0.08);
  font-size: ${rem(150)};
  font-weight: 900;
`;
