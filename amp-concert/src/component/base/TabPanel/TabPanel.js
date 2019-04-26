import * as React from 'react';
import styled, {css} from 'styled-components';
import handleAmpBindClassName from '/util/handleAmpBindClassName';
import mergeOnHandlers from '/util/mergeOnHandlers';

const TabContent = styled.div`
  display: none;
  width: 100%;
  order: 1;
  margin-top: 48px;
`;

const TabSelectorChild = styled.div`
  position: relative;
`;

const TabSelector = styled(({big: _b, ...rest}) => <div {...rest} />)`
  list-style: none;
  flex-grow: 1;
  text-align: center;
  cursor: pointer;
  outline: none; /* blast the AMPs */
  padding-bottom: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 16px;
  padding-right: 16px;

  ${({big}) => {
    if (big) {
      return css`
        font-size: 24px;
        font-weight: 600;
        line-height: 35px;
      `;
    }
    return '';
  }}

  &:first-of-type {
    padding-left: 0;
  }
  &:last-of-type {
    padding-right: 0;
  }
  &[selected][option] {
    outline: none;
    color: ${({theme}) => theme.colors.datPurp};
    > ${TabSelectorChild} {
      &:after {
        content: '';
        position: absolute;
        bottom: ${({big}) => (big ? '-2px' : '-4px')};
        left: 0;
        right: 0;
        height: ${({big}) => (big ? '3px' : '2px')};
        border-radius: 2px;
        background: ${({theme}) => theme.colors.datPurp};
      }
    }
  }
  &[selected] + ${TabContent} {
    display: block;
  }
`;

class Tab extends React.Component {
  render() {
    const {
      value,
      label,
      selected,
      children,
      panelId,
      as: As = TabSelector,
      ...rest
    } = this.props;
    return (
      <React.Fragment>
        {selected && (
          <amp-state id={panelId}>
            <script
              type="application/json"
              dangerouslySetInnerHTML={{__html: JSON.stringify(value)}}
            />
          </amp-state>
        )}
        <As
          role="tab"
          option={value}
          selected={selected ? 'selected' : undefined}
          {...rest}
        >
          <TabSelectorChild>{label}</TabSelectorChild>
        </As>
        {children && <TabContent role="tabpanel">{children}</TabContent>}
      </React.Fragment>
    );
  }
}

const TabPanelContainer = styled(({className, align: _align, ...rest}) => (
  <amp-selector class={className} {...rest} />
))`
  display: flex;
  flex-wrap: wrap;
  &:after {
    content: '';
    flex-grow: 1;
    display: none;
  }
  ${({align}) => {
    if (align === 'left' || align === 'right') {
      return css`
        > ${TabSelector} {
          flex-grow: 0;
        }
        &:after {
          display: block;
        }
      `;
    }
    if (align === 'right') {
      return css`
        &:after {
          order: -1;
        }
      `;
    }
    return '';
  }};
`;

const TabPortalChild = styled((props) => {
  return <div {...handleAmpBindClassName(props)} />;
})`
  &.spooky-mode {
    display: none;
  }
`;

class TabPanelPortal extends React.Component {
  render() {
    const panelId = `tabPanel${this.props.id.replace(/[^0-9a-zA-Z]/g, '')}`;
    const children = React.Children.map(this.props.children, (child) => {
      return (
        <TabPortalChild
          data-amp-bind-class={`${panelId} == '${
            child.props.value
          }' ? '' : 'spooky-mode'`}
        >
          {React.Children.map(child.props.children, (child) => {
            return React.cloneElement(child, {
              panelId,
            });
          })}
        </TabPortalChild>
      );
    });
    return <div>{children}</div>;
  }
}

class TabPanel extends React.Component {
  static Tab = Tab;
  static Portal = TabPanelPortal;
  static activate = (id, option) => {
    const panelId = `tabPanel${id.replace(/[^0-9a-zA-Z]/g, '')}`;
    return `AMP.setState({${panelId}: ${JSON.stringify(option)}})`;
  };
  render() {
    const {children, on, id, as: As = TabPanelContainer, ...rest} = this.props;
    const panelId = `tabPanel${id.replace(/[^0-9a-zA-Z]/g, '')}`;
    return (
      <As
        role="tablist"
        layout="container"
        on={mergeOnHandlers(
          `select:AMP.setState({${panelId}: event.targetOption})`,
          on,
        )}
        data-amp-bind-selected={panelId}
        {...rest}
      >
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            panelId,
          });
        })}
      </As>
    );
  }
}

export default TabPanel;
