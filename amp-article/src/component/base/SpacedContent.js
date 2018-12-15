import * as React from 'react';
import styled, {css} from 'styled-components';

const SpacedContent = styled(
  ({f: _f, border: _border, footer: _x, header: _y, ...rest}) => (
    <div {...rest} />
  ),
)`
  ${({footer, f}) => {
    if (footer) {
      return css`
        padding-bottom: ${f * 8}px;
      `;
    }
    return '';
  }} ${({header, f}) => {
    if (header) {
      return css`
        padding-top: ${f * 8}px;
      `;
    }
    return '';
  }}
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
