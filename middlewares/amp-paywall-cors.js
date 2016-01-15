/* Enable CORS for all AMP Paywall API requests */
module.exports = function(req, res, next) {
  if (req.url.startsWith('/amp-')) {
    // In practice, Origin should be restricted to a few well-known domains.
    var requestingOrigin = req.header('Origin');
    console.log('---- requesting origin: ', requestingOrigin);
    if (requestingOrigin) {
      res.setHeader('Access-Control-Allow-Origin', requestingOrigin);
    }
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  next();
};
