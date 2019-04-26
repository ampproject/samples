import {compose, header} from 'midori';

/**
 * Perform a redirect in AMP to the given URL.
 * @param {String} returnUrl URL to redirect to.
 * @returns {App} Midori app.
 */
const ampRedirect = (returnUrl) =>
  compose(
    header('AMP-Redirect-To', returnUrl),
    header(
      'Access-Control-Expose-Headers',
      ['AMP-Access-Control-Allow-Source-Origin', 'AMP-Redirect-To'].join(', '),
    ),
  );

export default ampRedirect;
