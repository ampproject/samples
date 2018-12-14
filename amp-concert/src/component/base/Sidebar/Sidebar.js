import * as React from 'react';
import styled, {css} from 'styled-components';

import Button from '/component/base/Button';
import Icon from '/component/base/Icon';
import AccountButton from '/component/partial/AccountButton';
import PaddedContent from '/component/base/PaddedContent';
import Animation from '/component/amp/Animation';
import handleAmpBindClassName from '/util/handleAmpBindClassName';

const SidebarHeader = styled((props) => {
  return <div {...handleAmpBindClassName(props)} />;
})`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin: 24px 0;
`;

const SidebarContainer = styled(({className, small: _small, ...rest}) => (
  <amp-sidebar class={className} {...rest} />
))`
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  ${({small}) => {
    if (small) {
      return css`
        width: 555px;
      `;
    }
    return css`
      width: 750px;
    `;
  }}
  box-shadow: -10px 0 0 rgba(255, 0, 86, 0.1);
  overflow: hidden;
  /* AMP HACK ALERT */
  > button ~ div:last-child {
    display: none;
  }
`;

const SidebarContent = styled.div`
  flex: auto;
  ${({noStickyFooter}) =>
    noStickyFooter
      ? ''
      : css`
          overflow: auto;
        `}
`;

const SidebarHeaderContainer = styled.div`
  position: relative;
  > *:last-child {
    margin-bottom: 32px;
  }
`;

const SidebarHeaderShadow = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  /*
  TODO: FIXME: Re-enable when AMP fixes scroll listeners in
  overflow elements..
  */
  /* -shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.1); */
  pointer-events: none;
`;

class CloseButton extends React.Component {
  render() {
    const {id, prev} = this.props;
    return (
      <Button.FakeLink on={`tap:${id}.close${prev ? `,${prev}.open` : ''}`}>
        {prev ? <Icon name="arrow-back" /> : <Icon name="close" />}
      </Button.FakeLink>
    );
  }
}

class DefaultSidebarHeader extends React.Component {
  render() {
    const {id, prev} = this.props;
    return (
      <PaddedContent h={7}>
        <SidebarHeader>
          <CloseButton id={id} prev={prev} />
          <div style={{marginLeft: 16}}>
            <AccountButton on={`tap:${id}.close`} inverted label />
          </div>
        </SidebarHeader>
      </PaddedContent>
    );
  }
}

class Sidebar extends React.PureComponent {
  static DefaultHeader = DefaultSidebarHeader;
  static CloseButton = CloseButton;
  render() {
    const {
      children,
      small,
      id,
      header = <DefaultSidebarHeader id={id} />,
      footer = null,
      side = 'right',
      noStickyFooter = false,
    } = this.props;
    return (
      <SidebarContainer small={small} id={id} layout="nodisplay" side={side}>
        <SidebarHeaderContainer>
          <Animation
            id={`amp-header-anim-${id}`}
            animation={{
              duration: '1',
              fill: 'both',
              animations: [
                {
                  selector: `#amp-header-shadow-${id}`,
                  keyframes: [
                    {opacity: 0.2, offset: 0},
                    {opacity: 0.7, offset: 1},
                  ],
                },
              ],
            }}
          />
          <SidebarHeaderShadow id={`amp-header-shadow-${id}`} />
          {header}
        </SidebarHeaderContainer>
        <SidebarContent noStickyFooter={noStickyFooter}>
          <div>
            {children}
            <div style={{height: 1}}>
              <amp-position-observer layout="nodisplay" />
            </div>
          </div>
        </SidebarContent>
        {footer}
      </SidebarContainer>
    );
  }
}

export default Sidebar;
