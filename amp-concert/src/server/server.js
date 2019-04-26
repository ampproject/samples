import {compose, use, send, serve, url, listen, request, apply} from 'midori';
import path from 'path';

import render from './render';

import ampPing from '/server/endpoint/ampPing';
import ampAccess from '/server/endpoint/ampAccess';
import cities from '/server/endpoint/cities';
import show from '/server/endpoint/show';
import dates from '/server/endpoint/dates';
import seats from '/server/endpoint/seats';
import tickets from '/server/endpoint/tickets';
import login from '/server/endpoint/login';
import submitReview from '/server/endpoint/submitReview';
import purchaseSummary from '/server/endpoint/purchaseSummary';
import signUp from '/server/endpoint/signUp';
import logout from '/server/endpoint/logout';

import country from '/server/selector/country';
import cors from '/server/util/cors';
import json from '/server/util/json';

const renderHtml = apply(request, country, url, async (req, country, url) => {
  const {status, headers, markup} = await render({
    path: url.path,
    locale: 'en-US',
    country,
  });
  return send(status, headers, markup);
});

const app = compose(
  // Endpoint used by a lot of `amp-list` components that require an `src` but
  // whose "true" `src` comes from an `amp-bind` expression that is evaluated
  // later on.
  use('/api/dummy.json', json(200, {})),
  // ============
  // AMP endpoints
  // ============
  use('/api/amp-ping.json', ampPing),
  use('/api/amp-access.json', ampAccess),
  // ============
  // API
  // ============
  use('/api/cities.json', cities),
  use('/api/show.json', show),
  use('/api/dates.json', dates),
  use('/api/seats.json', seats),
  use('/api/account/tickets.json', tickets),
  use('/api/account/login.json', login),
  use('/api/review.json', submitReview),
  use('/api/purchase-summary.json', purchaseSummary),
  use('/api/payment.json', json(400, {})),
  use('/api/account/signup.json', signUp),
  // ============
  // Static content
  // ============
  use(
    '/static',
    cors,
    serve({root: path.join(__dirname, '..', '..', 'static')}),
  ),
  // ============
  // Actual page
  // ============
  use('/account/logout', logout),
  renderHtml,
);

const port = process.env.PORT || 8080;

listen(app, port);
