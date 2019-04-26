import cuid from 'cuid';
import isReviewNotStale from './isReviewNotStale';

export const reviews = [];

setInterval(() => {
  for (let i = reviews.length - 1; i >= 0; --i) {
    if (!isReviewNotStale(reviews[i])) {
      reviews.splice(i, 0);
    }
  }
}, 2000);

const submitReview = async (params, context) => {
  if (!context.user) {
    // TODO: Not authenticated state.
    throw new Error();
  }
  reviews.push({
    id: cuid(),
    dynamic: true,
    author: context.user.name,
    text: params.text,
    postedAt: new Date(),
  });
  return true;
};

export default submitReview;
