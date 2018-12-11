import {header} from 'midori';

/**
 * Apply generic CORS headers. Not secure at all.
 * https://www.ampproject.org/docs/fundamentals/amp-cors-requests.
 */
const cors = header('Access-Control-Allow-Origin', '*');

export default cors;
