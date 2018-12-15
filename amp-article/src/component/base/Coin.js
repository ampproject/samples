import * as React from 'react';
import styled from 'styled-components';
import {omit} from 'ramda';

import AmpImage from '../amp/AmpImage';
import {numerify} from '/util/numerify';

const CoinImage = styled((props) => {
  const realProps = omit(['size', 'angle'], props);
  return <AmpImage {...realProps} />;
})`
  transform: ${({angle}) => (angle ? `rotate(${angle}deg)` : '')};
`;

class Coin extends React.Component {
  render() {
    const {size, angle, ...rest} = this.props;
    return (
      <CoinImage
        layout="fixed"
        width={numerify(size)}
        height={numerify(size)}
        angle={angle}
        src="/static/spending/coin@2x.png"
        {...rest}
      />
    );
  }
}

export default Coin;
