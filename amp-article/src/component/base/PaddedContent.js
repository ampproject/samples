import styled from 'styled-components';

const PaddedContent = styled.div`
  padding: ${({f = 0, h = f, v = f}) => `${v * 8}px ${h * 8}px`};
`;

export default PaddedContent;
