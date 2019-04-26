import styled from 'styled-components';

import {device} from '/util/device';

const MobilePadding = styled.div`
  ${device.below.tabletLandscape`
    padding: 0 25px;
  `};
`;

export default MobilePadding;
