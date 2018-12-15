import * as React from 'react';

import Animation from './Animation';

class ParallaxAnimation extends React.Component {
  render() {
    const {id, selector, direction, transform} = this.props;
    return (
      <Animation
        id={id}
        animation={{
          duration: 1,
          fill: 'both',
          direction: direction ? direction : 'normal',
          animations: [
            {
              selector: selector,
              keyframes: [
                {
                  transform: transform ? transform : 'translateY(-30%)',
                },
              ],
            },
          ],
        }}
      />
    );
  }
}

export default ParallaxAnimation;
