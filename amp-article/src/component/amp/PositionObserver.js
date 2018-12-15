import * as React from 'react';

class PositionObserver extends React.Component {
  render() {
    const {on, id} = this.props;
    return <amp-position-observer id={id} on={on} layout="nodisplay" />;
  }
}

export default PositionObserver;
