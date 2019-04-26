import * as React from 'react';
import styled from 'styled-components';

import Icon from '/component/base/Icon';
import Container from '/component/base/Container';
import Button from '/component/base/Button';
import AccountButton from '/component/partial/AccountButton';

import ReviewsSidebar from '/component/sidebar/ReviewsSidebar';
import LocationPickerSidebar from '/component/sidebar/LocationPickerSidebar';
import MobileNavSidebar from '/component/sidebar/MobileNavSidebar';
import TabPanel from '/component/base/TabPanel';
import LightningBolt from './LightningBolt';

import {above, below} from '/util/css';

const silenceReactWarning = () => {};

const MainForm = styled((props) => <form {...props} />)`
  max-width: 540px;
  min-width: 0;
  margin: 0 auto;
  flex: auto;
`;

const InputBorder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: solid 1px transparent;
  border-radius: 25px;
  pointer-events: none;
`;

const NavGroup = styled.ul`
  list-style: none;
  display: inline-flex;
`;

const NavItem = styled.li`
  display: inline-flex;
  margin-left: 8px;
  margin-right: 8px;
  color: ${({theme}) => theme.colors.datPurp};
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
`;

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  flex-direction: row;
  > * {
    margin: 0 16px;
    ${below.phone`
      margin: 0 8px;
    `}
    &:first-child {
      margin-left: 0;
    }
    &:last-child: {
      margin-right: 0;
    }
  }
`;

const ClearButton = styled((rest) => <button {...rest} />)`
  padding: 0 16px;
`;

const InputContainer = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  color: ${({theme}) => theme.colors.datPurp};
  background: #fff;
  height: 3.125em;
  border-radius: 25px;
  box-shadow: 2px 2px 12px 0 rgba(255, 0, 86, 0.12);

  > input {
    min-width: 0;
    flex: auto;
    align-self: stretch;
    line-height: 1.6; /* safari ripperonis without this */
    &:focus {
      outline: none;
      ~ ${InputBorder} {
        border-color: ${({theme}) => theme.colors.datPurp};
      }
    }
    &[value=''] ~ ${ClearButton} {
      display: none;
    }
  }
`;

const LightningBoltContainer = styled.div`
  flex: auto;
  ${below.phone`
    display: none;
  `}
`;

const NavContainer = styled.nav`
  ${below.phone`
    display: none;
  `}
`;

const MobileMenuContainer = styled.div`
  ${above.phone`
    display: none;
  `}
`;

class Header extends React.Component {
  render() {
    return (
      <Container style={{position: 'relative', zIndex: 34}}>
        <HeaderContainer>
          <MobileMenuContainer>
            <Button.FakeLink on={`tap:${MobileNavSidebar.id}.open;`}>
              <Icon name="menu" />
            </Button.FakeLink>
          </MobileMenuContainer>
          <LightningBoltContainer>
            <LightningBolt />
          </LightningBoltContainer>
          <MainForm id="mainform" method="POST" action-xhr="/api/dummy.json">
            <InputContainer>
              <input
                name="q"
                type="text"
                placeholder="Search a city"
                on="
            input-debounced:
              AMP.setState({
                query: event.value
              }),
              autosuggest-list.show;
            tap:
              AMP.setState({
                query: query == null ? '' : query
              }),
              autosuggest-list.show"
                data-amp-bind-value="query || ''"
                value=""
                required
                autoComplete="off"
                onChange={silenceReactWarning}
              />
              <div className="input-icon input-icon-left">
                <Icon name="search" />
              </div>
              <ClearButton
                type="reset"
                on="tap:
                    AMP.setState({
                      query: ''
                    })"
              >
                <Icon name="close" />
              </ClearButton>
              <InputBorder />
            </InputContainer>
          </MainForm>
          <NavContainer>
            <NavGroup>
              <NavItem>
                <Button.FakeLink
                  on={`tap:${TabPanel.activate('picker', 'city')},${
                    LocationPickerSidebar.id
                  }.open`}
                >
                  All Cities
                </Button.FakeLink>
              </NavItem>
              <NavItem>
                <Button.FakeLink
                  on={`tap:${TabPanel.activate('picker', 'date')},${
                    LocationPickerSidebar.id
                  }.open`}
                >
                  All Dates
                </Button.FakeLink>
              </NavItem>
              <NavItem>
                <Button.FakeLink on={`tap:${ReviewsSidebar.id}.open`}>
                  Live Reviews
                </Button.FakeLink>
              </NavItem>
            </NavGroup>
          </NavContainer>
          <AccountButton />
        </HeaderContainer>
      </Container>
    );
  }
}

export default Header;
