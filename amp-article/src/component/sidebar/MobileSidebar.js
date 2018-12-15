import * as React from 'react';
import styled from 'styled-components';

import Button from '/component/base/Button';
import HeaderButtons from '/component/base/HeaderButtons';
import Logo from '/component/base/Logo';
import Icon from '/component/base/Icon';

const SidebarContainer = styled(({className, ...rest}) => (
  <amp-sidebar class={className} {...rest} />
))`
  width: 100%;
  max-width: 100%;
  background: transparent;

  &[open] .closeContainer {
    background: rgba(0, 0, 0, 1);
  }

  & > div:empty {
    display: none;
  }
`;

const SidebarWrap = styled.div`
  display: flex;
  flex-direction: row-reverse;
  min-height: 100%;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0 0 15px;
`;

const CloseContainer = styled.div`
  background: rgba(0, 0, 0, 0);
  transition: background-color 0.25s ease-out 0.2s;
  padding-top: 15px;
`;
const ContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
`;
const SidebarContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  flex-grow: 1;
`;
const Item = styled.div`
  border-bottom: 1px solid ${({theme}) => theme.colors.alto};
  padding: 25px 15px;
  display: flex;
  justify-content: space-between;

  &:last-child {
    border-bottom: 0px none;
  }
`;
const Link = styled.div`
  color: ${({theme}) => theme.colors.purpleHeart};
  font-size: 21px;
  letter-spacing: 0.26px;
`;
const Number = styled.div`
  color: rgba(0, 0, 0, 0.5);
  font-size: 21px;
  letter-spacing: 0.26px;
`;
const Footer = styled.div`
  padding: 30px 15px;
  font-weight: 200;
  letter-spacing: 0.2px;
  background: #fff;

  & strong {
    font-weight: bold;
  }
`;

class MobileSidebar extends React.Component {
  render() {
    return (
      <SidebarContainer id="sidebar" layout="nodisplay" side="left">
        <SidebarWrap className="SidebarWrap">
          <CloseContainer className="closeContainer">
            <Button.Header color="white" on="tap:sidebar.close">
              <Icon name="x" size={24} />
            </Button.Header>
          </CloseContainer>
          <ContentContainer>
            <HeaderContainer>
              <Logo color="black" />
              <HeaderButtons color="black" />
            </HeaderContainer>
            <SidebarContent>
              <div>
                <Item>
                  <Link>Tech</Link>
                  <Number>21</Number>
                </Item>
                <Item>
                  <Link>Science</Link>
                  <Number>18</Number>
                </Item>
                <Item>
                  <Link>Culture</Link>
                  <Number>34</Number>
                </Item>
                <Item>
                  <Link>Reviews</Link>
                  <Number>11</Number>
                </Item>
                <Item>
                  <Link>Videos</Link>
                  <Number>48</Number>
                </Item>
              </div>
              <Footer>
                <strong>Mood</strong> is an online magazine that runs cover
                stories—big, ambitious pieces intended to change the way you see
                the world or influence the course of policy
              </Footer>
            </SidebarContent>
          </ContentContainer>
        </SidebarWrap>
      </SidebarContainer>
    );
  }
}

export default MobileSidebar;
