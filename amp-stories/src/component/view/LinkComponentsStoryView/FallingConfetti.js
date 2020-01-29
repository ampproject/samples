import React from 'react';
import styled from 'styled-components';

const BOX_WIDTH = 30;
const BOX_HEIGHT = 60;
const Box = styled.div`
  position: absolute;

  width: ${BOX_WIDTH}px;
  height: ${BOX_HEIGHT}px;
  & div {
    background: ${({theme}) => theme.colors.storiesLolliPink};
    width: ${BOX_WIDTH}px;
    height: ${BOX_HEIGHT}px;
    transform: rotate(0deg);
  }
  [active] & div {
    opacity: 1;
    transition: 5s ease-out;
    transition-property: opacity, transform;
    transform: rotate(180deg);
  }
  [active] & div:nth-child(odd) {
    transition: 3s ease-out;
  }
  [active] & div:nth-child(3n + 0) {
    transition: 6s ease-out;
  }
`;

// random opacity between 0.5 and 1
const randomOpacity = () => Math.random() / 2 + 0.5;
const Parallax = styled.div`
  transform: translateY(-60vh);

  &:nth-child(1) ${Box}:nth-child(1) {
    transform: translate(50vw, 50vh) rotate(20deg);
    opacity: ${randomOpacity()};
  }
  &:nth-child(1) ${Box}:nth-child(2) {
    transform: translate(10vw, 30vh) rotate(-35deg);
    opacity: ${randomOpacity()};
  }
  &:nth-child(1) ${Box}:nth-child(3) {
    transform: translate(20vw, 40vh) rotate(-10deg);
    opacity: ${randomOpacity()};
  }
  &:nth-child(1) ${Box}:nth-child(4) {
    transform: translate(60vw, 40vh) rotate(-10deg);
    opacity: ${randomOpacity()};
  }
  &:nth-child(1) ${Box}:nth-child(5) {
    transform: translate(20vw, 10vh) rotate(-10deg);
    opacity: ${randomOpacity()};
  }
  &:nth-child(1) ${Box}:nth-child(6) {
    transform: translate(70vw, 30vh) rotate(-60deg);
    opacity: ${randomOpacity()};
  }
  &:nth-child(1) ${Box}:nth-child(7) {
    transform: translate(35vw, 30vh) rotate(-25deg);
    opacity: ${randomOpacity()};
  }
  &:nth-child(2) ${Box}:nth-child(1) {
    transform: translate(70vw, 15vh) rotate(40deg);
    opacity: ${randomOpacity()};
  }
  &:nth-child(2) ${Box}:nth-child(2) {
    transform: translate(75vw, 45vh) rotate(-20deg);
    opacity: ${randomOpacity()};
  }
  &:nth-child(2) ${Box}:nth-child(3) {
    transform: translate(50vw, 32vh) rotate(30deg);
    opacity: ${randomOpacity()};
  }
  &:nth-child(2) ${Box}:nth-child(4) {
    transform: translate(50vw, 20vh) rotate(70deg);
    opacity: ${randomOpacity()};
  }
  &:nth-child(2) ${Box}:nth-child(5) {
    transform: translate(5vw, 45vh) rotate(60deg);
    opacity: ${randomOpacity()};
  }
  &:nth-child(2) ${Box}:nth-child(6) {
    transform: translate(90vw, 10vh) rotate(-20deg);
    opacity: ${randomOpacity()};
  }
  &:nth-child(2) ${Box}:nth-child(7) {
    transform: translate(60vw, 5vh) rotate(15deg);
    opacity: ${randomOpacity()};
  }
  &:nth-child(3) ${Box}:nth-child(1) {
    transform: translate(-2vw, 5vh) rotate(40deg);
    opacity: ${randomOpacity()};
  }
  &:nth-child(3) ${Box}:nth-child(2) {
    transform: translate(30vw, 20vh) rotate(-40deg);
    opacity: ${randomOpacity()};
  }
  &:nth-child(3) ${Box}:nth-child(3) {
    transform: translate(90vw, 40vh) rotate(30deg);
    opacity: ${randomOpacity()};
  }
  &:nth-child(3) ${Box}:nth-child(4) {
    transform: translate(80vw, 20vh) rotate(-10deg);
    opacity: ${randomOpacity()};
  }
  &:nth-child(3) ${Box}:nth-child(5) {
    transform: translate(40vw, 0vh) rotate(-10deg);
    opacity: ${randomOpacity()};
  }
  &:nth-child(3) ${Box}:nth-child(6) {
    transform: translate(30vw, 48vh) rotate(-18deg);
    opacity: ${randomOpacity()};
  }

  [active] & {
    transform: translateY(130vh);
    transition: 3s ease-out;
  }

  [active] &:nth-child(1) {
    transition-duration: 4.5s;
  }
  [active] &:nth-child(2) {
    transition-duration: 3.5s;
  }
`;

const FallingConfetti = () => {
  return (
    <React.Fragment>
      <Parallax>
        <Box>
          <div />
        </Box>
        <Box>
          <div />
        </Box>
        <Box>
          <div />
        </Box>
        <Box>
          <div />
        </Box>
        <Box>
          <div />
        </Box>
        <Box>
          <div />
        </Box>
        <Box>
          <div />
        </Box>
      </Parallax>
      <Parallax>
        <Box>
          <div />
        </Box>
        <Box>
          <div />
        </Box>
        <Box>
          <div />
        </Box>
        <Box>
          <div />
        </Box>
        <Box>
          <div />
        </Box>
        <Box>
          <div />
        </Box>
        <Box>
          <div />
        </Box>
      </Parallax>
      <Parallax>
        <Box>
          <div />
        </Box>
        <Box>
          <div />
        </Box>
        <Box>
          <div />
        </Box>
        <Box>
          <div />
        </Box>
        <Box>
          <div />
        </Box>
        <Box>
          <div />
        </Box>
      </Parallax>
    </React.Fragment>
  );
};

export default FallingConfetti;
