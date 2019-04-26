import * as React from 'react';
import styled from 'styled-components';

import Animation from '../amp/Animation';
import AmpImage from '../amp/AmpImage';
import PositionObserver from '../amp/PositionObserver';

const BurgerIngredientWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

class BurgerIngredient extends React.Component {
  render() {
    const {id, src, width, height, left, top, keyframes, ...rest} = this.props;
    const imgProps = {src, width, height, id};
    return (
      <BurgerIngredientWrapper {...rest}>
        <AmpImage
          {...imgProps}
          layout="fixed"
          style={{
            position: 'absolute',
            left: left,
            top: top,
          }}
        />
        <PositionObserver
          id={`${id}Observer`}
          instersection-ratios="1"
          on={`scroll:${id}Anim.seekTo(percent=event.percent)`}
        />
        <Animation
          id={`${id}Anim`}
          animation={{
            duration: 1,
            fill: 'both',
            direction: 'normal',
            animations: [
              {
                selector: `#${id}`,
                keyframes: keyframes,
              },
            ],
          }}
        />
      </BurgerIngredientWrapper>
    );
  }
}

export default BurgerIngredient;
