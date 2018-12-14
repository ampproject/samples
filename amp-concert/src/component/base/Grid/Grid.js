import * as React from 'react';
import styled from 'styled-components';

const calc = (colSpan, columns) => (colSpan * 100) / columns;

const Col = styled(({cols: _c, offset: _o, ...realProps}) => {
  return <div {...realProps} />;
})`
  position: relative;
  display: inline-block;
  width: ${({cols}) => calc(cols, 12)}%;
  ${({offset}) => (offset ? `margin-left: ${calc(offset, 12)}%;` : '')};
  vertical-align: top;
  padding: 16px;
  zoom: 1;
`;

const Grid = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  position: relative;
  margin: -16px;
`;

Grid.Col = Col;

export default Grid;
