import * as React from 'react';
import styled, {css} from 'styled-components';
import hash from 'string-hash';
import {device} from '/util/device';
import Text from '/component/base/Text';
import SpacedContent from '/component/base/SpacedContent';
import PositionObserver from '/component/amp/PositionObserver';
import Animation from '/component/amp/Animation';

const WorkAnimationWrapper = styled.div`
  margin: 0 auto;
  position: relative;
  height: 400vh;
  width: 761px;
  ${device.below.tabletLandscape`
    left: 50%;
    transform: translateX(-50%);
  `};
`;

const StatPercent = styled(Text.Accent)`
  font-size: 120px;
  font-weight: 400;
`;

const TextClamp = styled.span`
  max-width: 190px;
  display: inline-block;
`;

const StatText = styled(Text.P)`
  line-height: 24px;
  text-align: right;
`;

const StatContainer = styled.div`
  width: 240px;
  height: 200px;
  display: flex;
`;

const Stat = ({value, label, ...rest}) => (
  <StatContainer {...rest}>
    <SpacedContent f={3}>
      <StatPercent color="flushOrange">{value}</StatPercent>
      <StatText>
        <TextClamp>{label}</TextClamp>
      </StatText>
    </SpacedContent>
  </StatContainer>
);

const StickyDiv = styled.div`
  position: sticky;
  top: ${({top}) => top};
`;

const Wrapper = styled.div`
  position: absolute;
  ${({begin}) => {
    if (!begin) {
      return css`
        opacity: 0;
      `;
    }
    return '';
  }}
`;

const CENTER_EXPR = '50vh ';
const TOTAL_HEIGHT_VH = 400;

const Item = ({
  children,
  src,
  width,
  height,
  left,
  top,
  start = 0,
  duration = 1,
  end,
  begin = start === 0,
}) => {
  const offset = TOTAL_HEIGHT_VH * start;
  const bufferSize = TOTAL_HEIGHT_VH * duration;
  const id = `work-${hash(`${src}${start}${top}`)}`;
  const keyframes = [];
  if (begin) {
    keyframes.push({
      offset: 0,
      opacity: 1,
    });
  } else {
    keyframes.push(
      {
        offset: 0,
        opacity: 0,
      },
      {
        offset: 0.35,
        opacity: 0,
      },
    );
  }
  keyframes.push(
    {
      offset: 0.5,
      opacity: 1,
    },
    {
      offset: 0.85,
      opacity: 1,
    },
  );
  if (end) {
    keyframes.push({
      offset: 1,
      opacity: 1,
    });
  } else {
    keyframes.push(
      {
        offset: 0.9,
        opacity: 0,
      },
      {
        offset: 1,
        opacity: 0,
      },
    );
  }
  return (
    <Wrapper
      id={id}
      style={{
        top: `calc(${top}px + ${offset}vh)`,
        left,
        width,
        height: end ? 'auto' : `calc(${bufferSize}vh + ${height}px)`,
        bottom: end ? `calc(283px - ${height + top}px)` : 'auto',
      }}
    >
      <PositionObserver
        id={`${id}-observer`}
        instersection-ratios="1"
        on={`scroll:${id}-anim.seekTo(percent=event.percent)`}
      />
      <Animation
        id={`${id}-anim`}
        animation={{
          duration: '1',
          fill: 'both',
          direction: 'normal',
          animations: [
            {
              selector: `#${id}`,
              keyframes: keyframes,
            },
          ],
        }}
      />
      <StickyDiv top={`calc(${CENTER_EXPR} + ${top}px)`}>{children}</StickyDiv>
    </Wrapper>
  );
};

const ImageItem = ({src, width, height, ...rest}) => (
  <Item width={width} height={height} {...rest}>
    <amp-img layout="fixed" width={width} height={height} src={src} />
  </Item>
);

const StatItem = ({value, label, ...rest}) => (
  <Item {...rest} width={240} height={200}>
    <Stat value={value} label={label} />
  </Item>
);

export default class WorkAnimation extends React.Component {
  render() {
    return (
      <WorkAnimationWrapper>
        <StickyDiv top={`calc(${CENTER_EXPR})`}>
          <amp-img
            layout="fixed"
            width="761"
            height="283"
            src="/static/work/anim/base@2x.png"
          />
        </StickyDiv>

        <div
          style={{
            position: 'absolute',
            top: '0',
            bottom: '0',
            left: 0,
            right: 0,
          }}
        >
          <StatItem
            begin
            left={620}
            top={-200}
            value="43%"
            label="plan to leave their jobs within two years"
            duration={0.3}
          />
          <StatItem
            left={620}
            top={-200}
            value="62%"
            label="have considered starting their own business"
            start={0.3}
            duration={0.3}
          />
          <StatItem
            start={0.6}
            end
            left={620}
            top={-200}
            value="50%"
            label="are okay telecomuting some of the time"
          />
          <ImageItem
            top={-290}
            left={290}
            width={281}
            height={344}
            src="/static/work/anim/womansit@2x.png"
            duration={0.5}
          />
          <ImageItem
            top={-290}
            left={290}
            width={281}
            height={344}
            src="/static/work/anim/womanphone@2x.png"
            start={0.5}
            duration={0.5}
            end
          />
          <ImageItem
            top={-120}
            left={100}
            width={115}
            height={166}
            src="/static/work/anim/plant@2x.png"
            duration={0.35}
          />
          <ImageItem
            top={15}
            left={120}
            width={78}
            height={48}
            src="/static/work/anim/mug@2x.png"
            duration={0.355}
          />
          <ImageItem
            top={15}
            left={120}
            width={51}
            height={50}
            src="/static/work/anim/ball@2x.png"
            duration={0.352}
          />
          <ImageItem
            top={0}
            left={60}
            width={195}
            height={62}
            src="/static/work/anim/books2@2x.png"
            start={0.4}
            end
          />
          <ImageItem
            top={-15}
            left={125}
            width={78}
            height={48}
            src="/static/work/anim/mug@2x.png"
            start={0.4}
            end
          />
          <ImageItem
            top={-20}
            left={125}
            width={51}
            height={50}
            src="/static/work/anim/ball@2x.png"
            start={0.4}
            end
          />
          <ImageItem
            top={-255}
            left={250}
            width={140}
            height={153}
            src="/static/work/anim/chat-bubbles@2x.png"
            duration={0.3}
          />
          <ImageItem
            start={0.2}
            top={-295}
            left={180}
            width={180}
            height={208}
            src="/static/work/anim/idea-bubble@2x.png"
            start={0.3}
            duration={0.3}
          />
          <ImageItem
            start={0.5}
            top={-305}
            left={220}
            width={119}
            height={168}
            src="/static/work/anim/notifications@2x.png"
            start={0.6}
            duration={0.3}
            end
          />
          <ImageItem
            top={40}
            left={225}
            width={234}
            height={57}
            src="/static/work/anim/laptopclosed@2x.png"
            start={0.6}
            end
          />
          <ImageItem
            top={-20}
            left={190}
            width={257}
            height={113}
            src="/static/work/anim/laptopopen@2x.png"
            start={0.4}
            duration={0.2}
          />
          <ImageItem
            top={55}
            left={420}
            width={246}
            height={73}
            src="/static/work/anim/books@2x.png"
            duration={0.5}
          />
          <ImageItem
            top={-80}
            left={200}
            width={179}
            height={181}
            src="/static/work/anim/desktop@2x.png"
            duration={0.345}
          />
          <ImageItem
            top={55}
            left={540}
            width={67}
            height={44}
            src="/static/work/anim/mug2@2x.png"
            duration={0.5}
          />
          <ImageItem
            top={-20}
            left={520}
            width={115}
            height={166}
            src="/static/work/anim/plant@2x.png"
            start={0.5}
            end
          />
          <ImageItem
            top={115}
            left={520}
            width={78}
            height={48}
            src="/static/work/anim/mug@2x.png"
            start={0.5}
            end
          />
          <ImageItem
            top={115}
            left={520}
            width={51}
            height={50}
            src="/static/work/anim/ball@2x.png"
            start={0.5}
            end
          />
          <ImageItem
            top={135}
            left={520}
            width={91}
            height={34}
            src="/static/work/anim/phone@2x.png"
            duration={0.335}
          />
        </div>
      </WorkAnimationWrapper>
    );
  }
}
