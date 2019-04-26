// Import modules ==============================================================
import * as React from 'react';
import {ThemeProvider} from 'styled-components';

import Sidebar from '/component/sidebar/MobileSidebar';
import theme from '/theme';

class SidebarRoot extends React.Component {
  static rootElementId = 'sidebar';
  render() {
    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <Sidebar />
        </React.Fragment>
      </ThemeProvider>
    );
  }
}

export default SidebarRoot;
