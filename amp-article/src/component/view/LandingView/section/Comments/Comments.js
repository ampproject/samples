import * as React from 'react';
import styled from 'styled-components';

import {device} from '/util/device';
import AmpImage from '/component/amp/AmpImage';
import Animation from '/component/amp/Animation';
import PositionObserver from '/component/amp/PositionObserver';
import Container from '/component/base/Container';
import Confetti, {presets} from '/component/base/Confetti';
import Grid from '/component/base/Grid';
import Text from '/component/base/Text';
import MobilePadding from '/component/base/MobilePadding';

const CommentsSection = styled.section`
  padding: 358px 0 220px;
  background: ${({theme}) => theme.colors.black};
  color: ${({theme}) => theme.colors.white};
`;

const Header = styled(Text.Title)`
  ${device.below.tabletLandscape`
    margin: 0 0 180px 0;
  `};
`;

const CommentSectionHeaderIcon = styled.div`
  position: relative;
  padding-top: 10px;
  padding-left: 40px;
  padding-right: 40px;
`;

const CommentSectionHeaderContainer = styled.header`
  padding: 64px 0 64px;
  margin-left: -40px;
`;

const CommentAccordian = styled(({className, ...rest}) => (
  <amp-accordion class={className} {...rest} />
))`
  margin-top: 100px;
  /* AMP HACK! */
  ${CommentSectionHeaderContainer} {
    background: transparent;
    border: none;
  }
`;

const Comment = styled.section`
  border-top: solid 1px rgba(255, 255, 255, 0.1);
  &:first-child {
    border-top: none;
  }
`;

const CommentContent = styled.div`
  margin-bottom: 64px;
`;

const TitleConfetti = styled(Confetti)`
  position: absolute;
  left: 800px;
  top: 250px;
  ${device.below.tabletLandscape`
      left: 50%;
      top: auto;
      bottom: 0;
      transform: translate(-50%, 100%);
  `};
`;

const GuyImage = styled.div`
  position: absolute;
  top: -0.7em;
  right: -0.5em;
  transform: translate(0, 0) rotate(0deg);
  width: 184px;
  ${device.below.tabletPortrait`
      width: 92px;
  `};
`;

class CommentSectionHeader extends React.Component {
  render() {
    return (
      <CommentSectionHeaderContainer>
        <div style={{display: 'flex'}}>
          <CommentSectionHeaderIcon>{this.props.icon}</CommentSectionHeaderIcon>
          <div style={{flex: 'auto'}}>
            <Text size="40px">{this.props.title}</Text>
            <Text.P>{this.props.label}</Text.P>
          </div>
        </div>
      </CommentSectionHeaderContainer>
    );
  }
}

class GuyAnimation extends React.Component {
  render() {
    return (
      <div>
        <PositionObserver
          instersection-ratios="1"
          on="scroll:guyAloneAnim.seekTo(percent=event.percent)"
        />
        <Animation
          id="guyAloneAnim"
          animation={{
            duration: 1,
            fill: 'both',
            direction: 'normal',
            animations: [
              {
                selector: '#guy_alone',
                switch: [
                  {
                    media: '(min-width: 600px)',
                    keyframes: [
                      {
                        offset: 0,
                        transform: 'translate(-.8em,-575px) rotate(0deg)',
                      },
                      {
                        offset: 0.2,
                        transform: 'translate(-.8em,-575px) rotate(0deg)',
                      },
                      {
                        offset: 0.5,
                        transform: 'translate(-.8em,-1.35em) rotate(-55deg)',
                      },
                      {
                        offset: 0.6,
                        transform: 'translate(-.2em,-1.4em) rotate(15deg)',
                      },
                      {
                        offset: 0.8,
                        transform: 'translate(0,0) rotate(0deg)',
                      },
                      {
                        offset: 1,
                        transform: 'translate(0,0) rotate(0deg)',
                      },
                    ],
                  },
                  {
                    media: '(max-width: 599px)',
                    keyframes: [
                      {
                        offset: 0,
                        transform: 'translate(-.96em,-472px) rotate(0deg)',
                      },
                      {
                        offset: 0.5,
                        transform: 'translate(-1em,-1.2em) rotate(-55deg)',
                      },
                      {
                        offset: 0.6,
                        transform: 'translate(-.2em,-1.4em) rotate(15deg)',
                      },
                      {
                        offset: 0.8,
                        transform: 'translate(-6px,6px) rotate(0deg)',
                      },
                      {
                        offset: 1,
                        transform: 'translate(-6px,6px) rotate(0deg)',
                      },
                    ],
                  },
                ],
              },
            ],
          }}
        />
      </div>
    );
  }
}

class Comments extends React.Component {
  render() {
    return (
      <CommentsSection>
        <GuyAnimation />
        <Container>
          <MobilePadding>
            <Grid>
              <Grid.Col
                cols={8}
                offset={2}
                colsAtTabletLandscape={12}
                offsetAtTabletLandscape={0}
              >
                <Header>
                  <div>WHAT</div>
                  <div style={{display: 'inline-block', position: 'relative'}}>
                    OTHERS
                    <GuyImage id="guy_alone">
                      <AmpImage
                        src="/static/comments/guy_alone@2x.png"
                        width="184"
                        height="231"
                        layout="intrinsic"
                      />
                    </GuyImage>
                  </div>
                  <div>ARE SAYING</div>
                  <TitleConfetti pieces={presets.basic} color="white" />
                </Header>
                <CommentAccordian>
                  <Comment expanded>
                    <CommentSectionHeader
                      title="On YouTube"
                      label="Latest youtube video about Millennials"
                      icon={
                        <div>
                          <Confetti
                            pieces={presets.tiny}
                            color="youtubeRed"
                            style={{position: 'absolute', left: 10, top: -30}}
                          />
                          <amp-img
                            layout="fixed"
                            width="78"
                            height="55"
                            src="/static/comments/youtube@2x.png"
                          />
                        </div>
                      }
                    />
                    <CommentContent>
                      <amp-youtube
                        layout="responsive"
                        width="16"
                        height="9"
                        data-videoid="kaCQ-giZOxg"
                      />
                    </CommentContent>
                  </Comment>
                  <Comment>
                    <CommentSectionHeader
                      title="On Twitter"
                      label={
                        <div>
                          Expand to see recent{' '}
                          <a href="http://www.google.com">#millenials</a> tweets
                        </div>
                      }
                      icon={
                        <div>
                          <Confetti
                            pieces={presets.tiny}
                            color="twitterBlue"
                            style={{
                              position: 'absolute',
                              right: 0,
                              top: -30,
                              transform: 'rotate(50deg)',
                            }}
                          />
                          <amp-img
                            layout="fixed"
                            width="65.52"
                            height="53.54"
                            src="/static/comments/twitter@2x.png"
                          />
                        </div>
                      }
                    />
                    <CommentContent>
                      <Grid>
                        <Grid.Col cols={6} colsAtTabletPortrait={12}>
                          <amp-twitter
                            width="375"
                            height="472"
                            layout="responsive"
                            data-tweetid="1065035618516942848"
                          />
                        </Grid.Col>
                        <Grid.Col cols={6} colsAtTabletPortrait={12}>
                          <amp-twitter
                            width="375"
                            height="472"
                            layout="responsive"
                            data-tweetid="1063428413481017344"
                          />
                        </Grid.Col>
                        <Grid.Col cols={6} colsAtTabletPortrait={12}>
                          <amp-twitter
                            width="375"
                            height="472"
                            layout="responsive"
                            data-tweetid="1061146437013135361"
                          />
                        </Grid.Col>
                        <Grid.Col cols={6} colsAtTabletPortrait={12}>
                          <amp-twitter
                            width="375"
                            height="472"
                            layout="responsive"
                            data-tweetid="1060505969095000066"
                          />
                        </Grid.Col>
                      </Grid>
                    </CommentContent>
                  </Comment>
                  <Comment>
                    <CommentSectionHeader
                      title="On Instagram"
                      label="Expand to see some instagram post"
                      icon={
                        <div>
                          <Confetti
                            pieces={presets.tiny}
                            style={{
                              position: 'absolute',
                              left: 40,
                              top: -20,
                              transform: 'rotate(0deg)',
                            }}
                            color="instaOrange"
                          />
                          <amp-img
                            layout="fixed"
                            width="67.68"
                            height="67.46"
                            src="/static/comments/insta@2x.png"
                          />
                        </div>
                      }
                    />
                    <CommentContent>
                      <Grid>
                        <Grid.Col cols={6} colsAtTabletPortrait={12}>
                          <amp-instagram
                            data-shortcode="BqpiGv-n-ci"
                            width="1"
                            height="1"
                            layout="responsive"
                          />
                        </Grid.Col>
                        <Grid.Col cols={6} colsAtTabletPortrait={12}>
                          <amp-instagram
                            data-shortcode="BqnAOdnhE0k"
                            width="1"
                            height="1"
                            layout="responsive"
                          />
                        </Grid.Col>
                        <Grid.Col cols={6} colsAtTabletPortrait={12}>
                          <amp-instagram
                            data-shortcode="Bmvokc2AwaU"
                            width="1"
                            height="1"
                            layout="responsive"
                          />
                        </Grid.Col>
                        <Grid.Col cols={6} colsAtTabletPortrait={12}>
                          <amp-instagram
                            data-shortcode="BhpWgCjhSgi"
                            width="1"
                            height="1"
                            layout="responsive"
                          />
                        </Grid.Col>
                      </Grid>
                    </CommentContent>
                  </Comment>
                </CommentAccordian>
              </Grid.Col>
            </Grid>
          </MobilePadding>
        </Container>
      </CommentsSection>
    );
  }
}

export default Comments;
