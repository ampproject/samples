import * as React from 'react';
import moize from 'moize';
import styled, {keyframes} from 'styled-components';
import random from 'random';

import Shape from '/component/base/Shape';
import PRESETS from './presets';

const StyledComponent = styled(() => null)({}).render().type;
const StyleSheetConsumer = new StyledComponent({}).render().type;

const ConfettiContainer = styled(({width: _w, height: _h, ...rest}) => (
  <div {...rest} />
))`
  position: relative;
  width: ${({width}) => width}px;
  height: ${({height}) => height}px;
`;

const drift = ({rotate = 0, x, y}) => {
  return keyframes`
    0% {
      transform: translate(${x}px, ${y}px) rotate(${rotate}deg);
    }
    100% {
      transform: translate(0,0);
    }
  `;
};

/*
 * Provides an animatable wrapper for each Confetti shape.
 *
 * Animation param order: `name duration timing delay direction iterations fill-mode play-state`
 *
 * Problem 1: shapes all animate at the same time, looks robotic
 * Solution 1: add a random 0-2s animation-delay, inline style, overrides default 0s
 *
 * Problem 2: Long delays noticeably stutter shapes when animation finally starts
 * Solution 2: specify starting transform via inline style
 *
 * Problem 3: document contains 98113 bytes of CSS
 * Solution 3: ...
 */
const ConfettiWrapper = (props) => {
  const {angle: _a, x: x, y: y, rotate: r = 0, ...rest} = props;
  const delay = random.float(0, 2).toFixed(2);
  const anim = drift({rotate: r, x, y});
  return (
    <StyleSheetConsumer>
      {(sheet) => {
        anim.inject(sheet);
        return (
          <div
            {...rest}
            style={{
              animation: `${anim.getName()} 4s ease-in-out ${delay}s infinite alternate`,
            }}
          />
        );
      }}
    </StyleSheetConsumer>
  );
};

const MemoizedConfettiWraper = moize.react(ConfettiWrapper);

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const coords = (angle = 0, distance) => {
  let a = Math.abs(angle);

  if (a === 0) {
    a = random.int(-359, 359);
  }

  let x = Math.trunc((distance * Math.sin(a)) / Math.sin(90));
  let y = Math.trunc((distance * Math.sin(90 - a)) / Math.sin(90));
  if (angle < 0) {
    x = -x;
    y = -y;
  }
  return {a, x, y};
};

const Confetti = ({preset, size, color, ...rest}) => {
  const pieces = PRESETS[preset];

  const width = pieces.reduce((prev, cur) => {
    return Math.max(prev, cur.left + cur.size);
  }, 0);

  const height = pieces.reduce((prev, cur) => {
    return Math.max(prev, cur.top + cur.size);
  }, 0);

  return (
    <ConfettiContainer width={width} height={height} {...rest}>
      {pieces.map(({type, color: c = color, rotate: r, ...rest}, i) => {
        const {a, x, y} = coords(rest.angle, rest.size);
        const Component = Shape[capitalize(type)];
        return (
          <MemoizedConfettiWraper angle={a} x={x} y={y} rotate={r} key={i}>
            <Component key={i} size={size} color={c} {...rest} />
          </MemoizedConfettiWraper>
        );
      })}
    </ConfettiContainer>
  );
};

export default moize.react(Confetti);
