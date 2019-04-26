import * as React from 'react';

/**
 * https://ampbyexample.com/visual_effects/basics_of_orientation_effects/
 * Optional additional params:
 *   - [alpha|beta|gamma]-range="0 360"
 */
class OrientationObserver extends React.Component {
  render() {
    const {on, id, ...rest} = this.props;
    return (
      <amp-orientation-observer id={id} on={on} layout="nodisplay" {...rest} />
    );
  }
}

export default OrientationObserver;
