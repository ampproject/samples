import * as React from 'react';
import styled, {css} from 'styled-components';
import {omit} from 'ramda';

import {numerify} from '/util/numerify';

const BaseShape = (props) => {
  const realProps = omit(
    ['color', 'size', 'angle', 'fill', 'thickness', 'top', 'left'],
    props,
  );
  return <div {...realProps} />;
};

const Shape = styled(BaseShape)`
  display: block;
  width: ${({size}) => numerify(size)};
  height: ${({size}) => numerify(size)};
  border-color: ${({color, theme}) => (color ? theme.colors[color] : '')};
  transform: ${({angle}) => (angle ? `rotate(${angle}deg)` : '')};
  border-width: ${({thickness}) => (thickness ? numerify(thickness) : '')};
  border-style: solid;
  ${({fill}) => {
    if (fill) {
      return css`
        background: ${({color, theme}) => (color ? theme.colors[color] : '')};
      `;
    }
    return css`
      background: transparent;
    `;
  }};
  ${({top, left}) => {
    if (typeof top !== 'undefined' || typeof left !== 'undefined') {
      return css`
        position: absolute;
        top: ${numerify(top)};
        left: ${numerify(left)};
      `;
    }
    return '';
  }};
`;
Shape.Square = styled(Shape)``;
Shape.Circle = styled(Shape)`
  border-radius: 100em;
`;
Shape.Dot = (props) => <Shape.Circle {...props} fill />;

export default Shape;
