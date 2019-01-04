import * as React from 'react';
import styled from 'styled-components';
import {omit} from 'ramda';

import AmpImage from '../amp/AmpImage';
import {numerify} from '/util/numerify';

const BillImage = styled((props) => {
  const realProps = omit(['size', 'angle'], props);
  return <AmpImage {...realProps} />;
})`
  transform: ${({angle}) => (angle ? `rotate(${angle}deg)` : '')};
`;

class Bill extends React.Component {
  render() {
    const {size, angle, ...rest} = this.props;

    // bill@2x.png full resolution: 774 x 504 (1.53:1)
    const height = Math.round(size * (1 / 1.53));
    return (
      <BillImage
        layout="fixed"
        width={numerify(size)}
        height={numerify(height)}
        angle={angle}
        src="/static/spending/bill@2x.png"
        {...rest}
        style={{...rest.style}}
      />
    );
  }
}

export default Bill;
