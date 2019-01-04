import {css} from 'styled-components';

const sizes = {
  tiny: 320,
  phone: 599,
  tabletPortrait: 600,
  tabletLandscape: 900,
  desktop: 1200,
  huge: 1800,
};

const above = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${(sizes[label] + 1) / 16}em) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});

const below = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});

export const device = {above, below, sizes};
