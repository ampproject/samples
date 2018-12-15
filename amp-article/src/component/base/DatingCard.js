import * as React from 'react';
import styled from 'styled-components';
import {omit} from 'ramda';

import AmpImage from '../amp/AmpImage';
import Animation from '../amp/Animation';
import PositionObserver from '../amp/PositionObserver';

const CardContainer = styled.div`
  position: relative;
`;

class Observer extends React.Component {
  render() {
    return (
      <PositionObserver
        id={`${this.props.baseId}-observer`}
        instersection-ratios="1"
        on={`scroll:${this.props.baseId}-anim.seekTo(percent=event.percent)`}
      />
    );
  }
}

class DirectionAnimation extends React.Component {
  render() {
    return (
      <div>
        <Observer baseId={this.props.baseId} />
        <Animation
          id={`${this.props.baseId}-anim`}
          animation={{
            duration: '1',
            fill: 'both',
            direction: 'normal',
            animations: [
              {
                selector: `#${this.props.baseId}`,
                keyframes: [
                  {
                    offset: 0,
                    opacity: 1,
                    transform: 'translateX(0) rotate(0)',
                  },
                  {
                    offset: 0.5,
                    opacity: 1,
                    transform: 'translateX(0) rotate(0)',
                  },
                  {
                    offset: 0.625,
                    opacity: 1,
                    transform: `translateX(${this.props.x * 0.5}%) rotate(${this
                      .props.r * 0.5}deg)`,
                  },
                  {
                    offset: 0.75,
                    opacity: 0,
                    transform: `translateX(${this.props.x}%) rotate(${
                      this.props.r
                    }deg)`,
                  },
                  {
                    offset: 1,
                    opacity: 0,
                    transform: `translateX(${this.props.x}%) rotate(${
                      this.props.r
                    }deg)`,
                  },
                ],
              },
            ],
          }}
        />
      </div>
    );
  }
}

class DatingCard extends React.Component {
  render() {
    const realProps = omit(['flyoutDirection', 'layout', 'style'], this.props);
    const direction = this.props.flyoutDirection;
    const imgLayout = this.props.layout ? this.props.layout : 'fixed';
    let animation;

    if (direction && direction === 'left') {
      animation = (
        <DirectionAnimation baseId={this.props.id} x={-100} r={-45} />
      );
    } else if (direction && direction === 'right') {
      animation = <DirectionAnimation baseId={this.props.id} x={100} r={45} />;
    }

    return (
      <CardContainer style={this.props.style}>
        <AmpImage id={this.props.id} layout={imgLayout} {...realProps} />
        {animation}
      </CardContainer>
    );
  }
}

export default DatingCard;
