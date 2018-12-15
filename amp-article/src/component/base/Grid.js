/**
 * Grid & Columns
 * References sizes in ../Device.js
 *
 * Prop `hideFor` accepts `device.above.x` or `device.below.x` breakpoints
 * Column sizing is applied via `colsAtX` where `X` is one of `device.sizes`.
 *
 * Usage:
 *
 *  <Grid
 *    alignItems="center"
 *    justifyContent="flex-end"
 *    textAlign="center"
 *    debug="true"
 *    hideFor={device.above.tabletLandscape}
 *    showFor={device.above.Phone}
 *  >
 *    <Grid.Col
 *      textAlign="right"
 *      justifySelf="flex-start"
 *      hideFor={device.above.tabletLandscape}
 *      showFor={device.above.Phone}
 *      cols={6}
 *      colsAtPhone={12}
 *      offset={2}
 *      coffsetAtPhone={1}
 *    >
 *    </Grid.Col>
 *  </Grid>
 *
 */
import * as React from 'react';
import styled from 'styled-components';
import {omit} from 'ramda';

import {device} from '/util/device';

const calc = (colSpan, columns) => (colSpan * 100) / columns;
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const sizeKeys = Object.keys(device.sizes).sort((a, b) => {
  return device.sizes[b] - device.sizes[a];
});

const Col = styled((props) => {
  const realProps = omit(
    [
      'cols',
      'offset',
      'textAlign',
      'hideFor',
      'showFor',
      'justifySelf',
      ...sizeKeys.map((size) => `colsAt${capitalize(size)}`),
      ...sizeKeys.map((size) => `offsetAt${capitalize(size)}`),
    ],
    props,
  );
  return <div {...realProps} />;
})`
  position: relative;
  display: inline-block;
  width: ${({cols}) =>
      calc(cols, 12).toString().length > 6
        ? `calc(100%/12*${cols});`
        : `${calc(cols, 12)}%`}
    ${({offset}) => (offset ? `margin-left: calc(100%/12*${offset});` : '')};
  vertical-align: top;
  padding: 16px;
  zoom: 1;
  ${({textAlign}) => (textAlign ? `text-align: ${textAlign};` : '')};
  ${({justifySelf}) => (justifySelf ? `justify-self: ${justifySelf};` : '')};
  ${({hideFor}) => (hideFor ? hideFor`display: none;` : '')};

  ${(props) => {
    return sizeKeys.map((size) => {
      const key = `colsAt${capitalize(size)}`;
      if (typeof props[key] === 'number') {
        return device.below[size]`
          width: ${calc(props[key], 12)}%;
        `;
      }
      return '';
    });
  }};

  ${(props) => {
    return sizeKeys.map((size) => {
      const key = `offsetAt${capitalize(size)}`;
      if (typeof props[key] === 'number') {
        return device.below[size]`
          margin-left: ${calc(props[key], 12)}%;
        `;
      }
      return '';
    });
  }};
`;

const Grid = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  position: relative;
  margin: -16px;
  ${({alignItems}) => (alignItems ? `align-items: ${alignItems};` : '')}
  ${({justifyContent}) =>
    justifyContent ? `justify-content: ${justifyContent};` : ''};
  ${({debug}) => (debug ? '& > * { outline: 1px solid; }' : '')};
  ${({hideFor}) => (hideFor ? hideFor`display: none;` : '')};
`;

Grid.Col = Col;

export default Grid;
