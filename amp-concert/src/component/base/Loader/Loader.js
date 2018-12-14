import * as React from 'react';
import styled, {keyframes} from 'styled-components';

const dash = keyframes`
  50% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: -102;
  }
`;

const AnimatedPath = styled.path`
  stroke-dasharray: 102;
  stroke-dashoffset: 102;
  animation: ${dash} 1s linear infinite;
`;

export default class Loader extends React.Component {
  render() {
    return (
      <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
        <AnimatedPath
          stroke="#4C2F9B"
          strokeWidth="2"
          d="M26.296 3L11 5.735l8.048 12.92-7.271 1.582L27.782 38 25.09 22.678l4.91-.984z"
          fill="none"
        />
      </svg>
    );
  }
}
