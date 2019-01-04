import * as React from 'react';
import styled from 'styled-components';
import {omit} from 'ramda';

import {handleAmpBindClassName} from '/util/handleAmpBindClassName';

const Hidable = styled((props) => {
  const realProps = omit(['hideFor'], props);
  return <div {...handleAmpBindClassName(realProps)} />;
})`
  ${({hideFor}) => (hideFor ? hideFor`display: none;` : '')};
`;

export default Hidable;
