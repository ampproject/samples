import {css} from 'styled-components';

export const sizes = {
  phone: 788,
  bandFailure: 1100,
};

export const above = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${(sizes[label] + 1) / 16}em) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});

export const below = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});
