import styled from 'styled-components';
import {below} from '/util/css';

const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  padding: 0 48px;
  margin: 0 auto;
  ${below.phone`
    padding: 0 24px;
  `}
`;

export default Container;
