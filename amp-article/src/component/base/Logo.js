import * as React from 'react';
import styled from 'styled-components';
import {omit} from 'ramda';

const LogoContainer = styled((props) => {
  const realProps = omit(['color'], props);
  return <div {...realProps} />;
})`
  font-size: 1.5em;
  font-family: 'Abril Fatface';
  color: ${({color}) => (color ? color : 'white')};
`;

class Logo extends React.Component {
  render() {
    return <LogoContainer color={this.props.color}>Mood</LogoContainer>;
  }
}

export default Logo;
