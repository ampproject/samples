import * as React from 'react';
import styled from 'styled-components';
import {omit} from 'ramda';

import {device} from '/util/device';

const TextContainer = styled((props) => {
  const realProps = omit(
    ['color', 'size', 'family', 'weight', 'height'],
    props,
  );
  return <div {...realProps} />;
})`
  font-size: ${({size}) => (size ? size : '16px')};
  font-family: ${({family}) => (family ? family : 'Roboto')};
  font-weight: ${({weight}) => (weight ? weight : '300')};
  color: ${({color}) => (color ? ({theme}) => theme.colors[color] : '')};
  line-height: ${({height}) => (height ? height : '')};
`;

class Text extends React.Component {
  render() {
    return <TextContainer {...this.props}>{this.props.children}</TextContainer>;
  }
}

Text.Title = styled(Text)`
  font: 700 170px/1.05em Oswald;
  letter-spacing: 1.9px;
  ${device.below.tabletPortrait`font-size: 23.5vw;`};
`;
Text.P = styled(Text)`
  font: 300 18px/1.89em Roboto;
  letter-spacing: 0.13px;
  margin-bottom: 1em;
  text-align: justify;
  ${device.below.tabletLandscape`text-align: left;`};
`;
Text.Accent = styled(Text)`
  font-size: 100px;
  line-height: 1.05em;
  font-weight: 300;
  ${device.below.tabletLandscape`font-size: 16vw;`};
`;
Text.AccentSmall = styled(Text)`
  font-size: 56px;
  line-height: 1.17em;
  font-weight: 300;
  ${device.below.tabletLandscape`font-size: 8vw;`};
`;
Text.Carousel = styled(Text)`
  font-size: 32px;
  line-height: 1.2em;
`;

export default Text;
