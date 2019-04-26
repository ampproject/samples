import * as React from 'react';
import styled from 'styled-components';

import Sidebar from '/component/base/Sidebar';
import PaddedContent from '/component/base/PaddedContent';
import Button from '/component/base/Button';
import TabPanel from '/component/base/TabPanel';
import LocationPickerSidebar from '/component/sidebar/LocationPickerSidebar';
import ReviewsSidebar from '/component/sidebar/ReviewsSidebar';
import CountryInfo from '/component/partial/CountryInfo';

const NavContainer = styled.nav`
  display: block;
`;

const NavGroup = styled.ul`
  list-type: none;
  display: block;
`;

const NavItem = styled.li`
  display: block;
`;

const Link = styled(Button.FakeLink)`
  font-size: 32px;
  line-height: 72px;
  color: #ff0056;
`;

export default class MobileNavSidebar extends React.Component {
  static id = 'mobilenav';
  render() {
    return (
      <Sidebar
        id={MobileNavSidebar.id}
        side="left"
        noStickyFooter
        footer={<CountryInfo />}
      >
        <PaddedContent h={7} v={4}>
          <NavContainer>
            <NavGroup>
              <NavItem>
                <Link
                  on={`tap:${MobileNavSidebar.id}.close,${TabPanel.activate(
                    'picker',
                    'city',
                  )},${LocationPickerSidebar.id}.open`}
                >
                  All Cities
                </Link>
              </NavItem>
              <NavItem>
                <Link
                  on={`tap:${MobileNavSidebar.id}.close,${TabPanel.activate(
                    'picker',
                    'date',
                  )},${LocationPickerSidebar.id}.open`}
                >
                  All Dates
                </Link>
              </NavItem>
              <NavItem>
                <Link
                  on={`tap:${MobileNavSidebar.id}.close,${
                    ReviewsSidebar.id
                  }.open`}
                >
                  Live Reviews
                </Link>
              </NavItem>
            </NavGroup>
          </NavContainer>
        </PaddedContent>
      </Sidebar>
    );
  }
}
