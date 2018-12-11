import * as React from 'react';
import styled from 'styled-components';

import Loader from '/component/base/Loader';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  > amp-list > [role='list'] {
    height: auto; /* BLAST OUT AMP */
  }
`;

export default class List extends React.Component {
  render() {
    const {children, ...rest} = this.props;
    return (
      <ListContainer>
        <amp-list
          width="auto"
          height="auto"
          layout="flex-item"
          noloading=""
          reset-on-refresh=""
          {...rest}
        >
          <div placeholder="">
            <Loader />
          </div>
          <div fallback="">Failed to load data.</div>
          {children}
        </amp-list>
      </ListContainer>
    );
  }
}
