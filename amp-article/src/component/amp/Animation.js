import * as React from 'react';

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
