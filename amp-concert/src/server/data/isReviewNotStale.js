const isReviewNotStale = ({dynamic, postedAt}) => {
  if (!dynamic) {
    return true;
  }
  return Date.now() - postedAt.getTime() < 1000 * 60 * 5;
};

export default isReviewNotStale;
