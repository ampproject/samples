import {createSelector, request} from 'midori';
import BusBoy from 'busboy';

/**
 * Get form data from `amp-form` elements that submit with `action-xhr`. They
 * don't send JSON (wrrryyyy) so we have a little more work to do.
 */
const formData = createSelector(
  request,
  (req) => {
    return new Promise((resolve, reject) => {
      const data = {};
      const busboy = new BusBoy({
        headers: req.headers,
      });
      busboy
        .on('error', (err) => {
          reject(err);
        })
        .on('finish', () => {
          resolve(data);
        })
        .on('field', (name, value) => {
          data[name] = value;
        });
      req.pipe(busboy);
    });
  },
);

export default formData;
