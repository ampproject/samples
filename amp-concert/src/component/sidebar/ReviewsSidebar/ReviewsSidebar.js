import * as React from 'react';
import styled from 'styled-components';

import Sidebar from '/component/base/Sidebar';
import Button from '/component/base/Button';
import SpacedContent from '/component/base/SpacedContent';
import PaddedContent from '/component/base/PaddedContent';

import {above, below} from '/util/css';

const AuthorContainer = styled.div`
  margin-left: 0.6em;
`;

const Author = styled.span`
  font-weight: 600;
`;

const ReviewText = styled.p`
  color: #000000;
  font-size: 18px;
  line-height: 27px;
`;

const Header = styled.h1`
  color: #000000;
  font-size: 80px;
  font-weight: 500;
  line-height: 1.225;
  ${below.phone`
    font-size: 34px;
  `}
`;

const Byline = styled.h2`
  opacity: 0.5;
  color: #000000;
  font-size: 24px;
  line-height: 1.4583333;
  ${below.phone`
    font-size: 18px;
  `}
`;

const ReviewCommentFormContainer = styled.div`
  background: #fff;
  z-index: 22;
  box-shadow: 0 -8px 14px 0 rgba(48, 48, 48, 0.08);
`;

const InputContainer = styled.label`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 8px;
  align-items: center;
  justify-content: flex-end;
`;

const InputBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #d8d8d8;
  border-radius: 25px;
  order: -99;
  z-index: -1;
`;

const InputButton = styled.button`
  height: 34px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  font-weight: 600;
  padding: 0 16px;
  background: #bdbbbe;
`;

const Input = styled.textarea`
  flex: auto;
  resize: none;
  height: 1.4em;
  line-height: 24px;
  margin: 2px 8px;
  &:focus {
    outline: none;
    width: 100%;
    min-height: 4em;
  }
  &:focus ~ ${InputButton} {
    background: #ff0056;
    color: #fff;
  }
`;

const TimeAgo = styled.span`
  color: #7f7f7f;
`;

const MagicButton = styled(Button)`
  ${above.phone`
    max-width: 355px;
    margin: 0 auto;
  `}
`;

class ReviewCommentForm extends React.Component {
  render() {
    return (
      <ReviewCommentFormContainer>
        <PaddedContent h={7} v={2}>
          <form
            amp-access-hide=""
            amp-access="loggedIn"
            id="new-comment-form"
            method="POST"
            action-xhr="/api/review.json"
            on="submit-success:new-comment-form.clear"
          >
            <div submit-error="">
              <template type="amp-mustache">Oops! {'{{message}}'}.</template>
            </div>
            <InputContainer>
              <Input name="text" placeholder="Start writing your review…" />

              <InputButton type="submit">Post review</InputButton>
              <InputBackground />
            </InputContainer>
          </form>
          <MagicButton
            block
            amp-access="NOT loggedIn"
            on="tap:amp-access.login-signIn"
          >
            Login / Sign up to write a review
          </MagicButton>
        </PaddedContent>
      </ReviewCommentFormContainer>
    );
  }
}

const NewReviewsBanner = styled(Button)`
  margin: 32px 0;
`;

class ReviewsSidebar extends React.Component {
  static id = 'sidebarReviews';
  render() {
    const {reviews = []} = this.props;
    const footer = <ReviewCommentForm />;
    const header = (
      <div>
        <Sidebar.DefaultHeader id={ReviewsSidebar.id} />
        <PaddedContent h={7}>
          <div>
            <amp-live-list
              layout="container"
              data-poll-interval="15000"
              data-max-items-per-page="1"
              id="amp-live-list-review-count"
            >
              <div items="">
                <div
                  id="review-count"
                  data-sort-time="1"
                  data-update-time={Date.now()}
                >
                  <Header>Live Reviews</Header>
                  <Byline>{reviews.length} Reviews</Byline>
                </div>
              </div>
              <div update="">UPDATERS</div>
            </amp-live-list>
          </div>
        </PaddedContent>
      </div>
    );
    return (
      <Sidebar id={ReviewsSidebar.id} footer={footer} header={header}>
        <PaddedContent h={7} v={5}>
          <amp-live-list
            id="amp-live-list-all-reviews"
            data-poll-interval="15000"
            data-max-items-per-page="30"
          >
            <div update="">
              <NewReviewsBanner block on="tap:amp-live-list-all-reviews.update">
                See Latest Reviews
              </NewReviewsBanner>
            </div>
            <SpacedContent f={4} border items="">
              {reviews.map((review) => {
                return (
                  <div
                    key={review.id}
                    id={`review-${review.id}`}
                    data-sort-time={review.postedAt.getTime()}
                  >
                    <SpacedContent f={2}>
                      <ReviewText>{review.text}</ReviewText>
                      <div style={{display: 'flex'}}>
                        <TimeAgo>
                          <amp-timeago
                            layout="fixed-height"
                            height="1.2em"
                            datetime={review.postedAt.toISOString()}
                            locale="en"
                          >
                            {review.postedAt.toString()}
                          </amp-timeago>
                        </TimeAgo>
                        <AuthorContainer>
                          by <Author>{review.author}</Author>
                        </AuthorContainer>
                      </div>
                    </SpacedContent>
                  </div>
                );
              })}
            </SpacedContent>
          </amp-live-list>
        </PaddedContent>
      </Sidebar>
    );
  }
}

export default ReviewsSidebar;
