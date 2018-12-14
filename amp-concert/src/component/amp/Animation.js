import * as React from 'react';

/**
 * Component for wrapping `amp-animation`.
 * Accepts `animation` as an object for what would normally be the JSON blob
 * inside the animation tag.
 * https://www.ampproject.org/docs/reference/components/amp-animation
 */
class Animation extends React.Component {
  render() {
    const {animation, id} = this.props;
    return (
      <amp-animation id={id} layout="nodisplay">
        <script
          type="application/json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(animation)}}
        />
      </amp-animation>
    );
  }
}

export default Animation;
