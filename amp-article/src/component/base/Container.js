import styled from 'styled-components';

import {device} from '/util/device';

const Container = styled.div`
  max-width: 1440px;
  min-width: ${device.sizes.tiny}px;
  margin: auto;
  position: relative;
  padding: 0 16px;
`;

export default Container;
