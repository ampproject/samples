import {apply, request, url, header} from 'midori';

/**
 * Add the `AMP-Access-Control-Allow-Source-Origin` header. Most of the dirty
 * can be found here: https://www.ampproject.org/docs/fundamentals/amp-cors-requests.
 * We're not doing anything secure here at all and this should probably be
 * changed to some `process.env.ORIGINS` or similar.
 */
const ampAccessControl = apply(request, url, (req, url) => {
  const isAmpSameOrigin = req.headers['amp-same-origin'] === 'true';
  if (isAmpSameOrigin) {
    return header(
      'AMP-Access-Control-Allow-Source-Origin',
      `${url.protocol}//${url.host}`,
    );
  }
  return header('AMP-Access-Control-Allow-Source-Origin', url.origin);
});

export default ampAccessControl;
