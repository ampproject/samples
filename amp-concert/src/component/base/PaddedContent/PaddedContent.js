import styled from 'styled-components';
import {below} from '/util/css';

const mobileFactor = [
  1, // 0
  1, // 8
  1, // 16
  1, // 24
  0.75, // 32 -> 24
  0.6, // 40 -> 24
  0.5, // 48 -> 24,
];

const getMobileFactor = (v) => {
  if (v < mobileFactor.length && v > 0) {
    return mobileFactor[v];
  }
  return mobileFactor[mobileFactor.length - 1];
};

const PaddedContent = styled.div`
  padding: ${({f = 0, h = f, v = f}) => `${v * 8}px ${h * 8}px`};
  ${below.phone`
    padding: ${({f = 0, h = f, v = f}) =>
      `${getMobileFactor(v) * v * 8}px ${getMobileFactor(h) * h * 8}px`};
  `}
`;

export default PaddedContent;
