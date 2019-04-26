import * as React from 'react';
import styled from 'styled-components';
import {omit} from 'ramda';

import {device} from '/util/device';
import {handleAmpBindClassName} from '/util/handleAmpBindClassName';
import Button from './Button';
import Icon from './Icon';
import Animation from '/component/amp/Animation';
import AmpSocialShare from '/component/amp/AmpSocialShare';

const FloatingContainer = styled((props) => {
  const realProps = omit(['hideFor'], props);
  return <div {...handleAmpBindClassName(realProps)} />;
})`
  ${({hideFor}) => (hideFor ? hideFor`display: none;` : '')};
  position: fixed;
  bottom: 30px;
  right: 30px;
  display: flex;
  z-index: 10;
`;

const ShareContainer = styled((props) => {
  return <div {...handleAmpBindClassName(props)} />;
})`
  z-index: 2;

  &.closed amp-social-share {
    opacity: 0;
  }

  &.closed .openContent {
    opacity: 0;
  }

  &:not(.closed) .closedContent {
    opacity: 0;
  }

  &:not(.closed) .share-1 {
    transform: translate(-50%, calc(-100% - 10px));
  }
  &:not(.closed) .share-2 {
    transform: translate(-50%, calc(-200% - 20px));
  }
  &:not(.closed) .share-3 {
    transform: translate(-50%, calc(-300% - 30px));
  }

  & amp-social-share {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: -1;
  }
`;
const ToggleButton = styled(Button.White)`
  z-index: 2;

  & > div {
    transition: opacity 0.25s ease-out;
    display: flex;
    align-items: center;

    &:first-child {
      position: absolute;
    }
  }
`;
const BackToTopButton = styled(Button.White)`
  opacity: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
`;

class FloatingButtons extends React.Component {
  render() {
    return (
      <FloatingContainer
        hideFor={device.below.tabletPortrait}
        data-amp-bind-class={`
          scrollToTopVisible == true ? "scrollBtnVisible" : ""
        `}
      >
        <ShareContainer
          id="shareContainer"
          className="closed"
          data-amp-bind-class={`
            shareButtonsOpen == true ? "" : "closed"
          `}
        >
          <ToggleButton on="tap:AMP.setState({shareButtonsOpen: !shareButtonsOpen})">
            <div className="closedContent">
              <amp-img
                layout="fixed"
                width="16"
                height="23"
                src="/static/icons/arrow-right-curve.svg"
              />
              <div style={{paddingLeft: '10px'}}>Share</div>
            </div>
            <div className="openContent">
              <Icon name="x" size={24} style={{marginRight: '10px'}} />
              <div>Close</div>
            </div>
          </ToggleButton>

          <AmpSocialShare.Email className="share-1" width="56" height="56" />
          <AmpSocialShare.Twitter className="share-2" width="56" height="56" />
          <AmpSocialShare.Facebook className="share-3" width="56" height="56" />
        </ShareContainer>

        <Animation
          id="showScrollToTopAnim"
          animation={{
            duration: '200ms',
            fill: 'both',
            iterations: '1',
            direction: 'alternate',
            animations: [
              {
                selector: '#scrollToTopButton',
                keyframes: [
                  {
                    opacity: '1',
                    visibility: 'visible',
                  },
                ],
              },
              {
                selector: '#shareContainer',
                keyframes: [
                  {
                    transform: 'translateX(-70px)',
                  },
                ],
              },
            ],
          }}
        />

        <Animation
          id="hideScrollToTopAnim"
          animation={{
            duration: '200ms',
            fill: 'both',
            iterations: '1',
            direction: 'alternate',
            animations: [
              {
                selector: '#scrollToTopButton',
                keyframes: [
                  {
                    opacity: '0',
                    visibility: 'hidden',
                  },
                ],
              },
              {
                selector: '#shareContainer',
                keyframes: [
                  {
                    transform: 'translateX(0px)',
                  },
                ],
              },
            ],
          }}
        />

        <BackToTopButton
          id="scrollToTopButton"
          on="tap:page-top.scrollTo(duration=200)"
          className="scrollToTop"
        >
          <Icon name="arrow-up" size={24} />
        </BackToTopButton>
      </FloatingContainer>
    );
  }
}

export default FloatingButtons;
