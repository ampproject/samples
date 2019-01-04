import * as React from 'react';

import {device} from '/util/device';
import Grid from '../base/Grid';
import Logo from '../base/Logo';
import Button from '../base/Button';
import Icon from '../base/Icon';
import HeaderButtons from '../base/HeaderButtons';

class MobileHeader extends React.Component {
  render() {
    return (
      <Grid alignItems="center" hideFor={device.above.tabletLandscape}>
        <Grid.Col cols={6} style={{display: 'flex', alignItems: 'center'}}>
          <Button.Header on="tap:sidebar.toggle">
            <Icon name="menu" size={24} />
          </Button.Header>
          <Logo color="white" />
        </Grid.Col>
        <Grid.Col cols={6}>
          <HeaderButtons />
        </Grid.Col>
      </Grid>
    );
  }
}

export default MobileHeader;
