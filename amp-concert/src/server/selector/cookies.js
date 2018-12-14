import {createSelector, request, response} from 'midori';
import Cookies from 'cookies';

/**
 * Control cookies for the current request/response.
 */
const cookies = createSelector(
  request,
  response,
  (req, res) => new Cookies(req, res),
);

export default cookies;
