import getWorksheetData from './getWorksheetData';

import {reviews as userData} from './submitReview';
import isReviewNotStale from './isReviewNotStale';
import parseDate from './parseDate';

const getReviews = async () => {
  const rows = await getWorksheetData('reviews');
  const reviews = rows
    .filter((item) => {
      if (!item.text || !item.author || !item.postedat) {
        return false;
      }
      if (!parseDate(item.postedat)) {
        return false;
      }
      return true;
    })
    .map(({author, text, postedat}, index) => {
      return {
        id: `internal-${index}`,
        author,
        text,
        postedAt: parseDate(postedat),
      };
    });
  const results = [...reviews, ...userData].filter(isReviewNotStale);
  results.sort((a, b) => {
    return b.postedAt.getTime() - a.postedAt.getTime();
  });
  return results;
};

export default getReviews;
