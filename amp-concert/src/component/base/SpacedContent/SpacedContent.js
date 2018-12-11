import * as React from 'react';
import styled, {css} from 'styled-components';

const SpacedContent = styled(({f: _f, border: _border, ...rest}) => (
  <div {...rest} />
))`
  > * {
    margin-top: ${({f}) => f * 8}px;
    margin-bottom: ${({f}) => f * 8}px;
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
    ${({border}) => {
      if (border) {
        return css`
          padding-bottom: ${({f}) => f * 8}px;
          border-bottom: solid 1px rgba(0, 0, 0, 0.08);
        `;
      }
      return '';
    }};
  }
`;

export default SpacedContent;
