import {
  compose,
  use,
  send,
  serve,
  url,
  header,
  listen,
  request,
  apply,
} from 'midori';
import path from 'path';
import random from 'random';

import render from './render';
random.use('xor128', 'amp-seed');

const accessControl = url((url) => {
  return header('AMP-Access-Control-Allow-Source-Origin', url.origin);
});

const cors = header('Access-Control-Allow-Origin', '*');

const json = (data) =>
  send(200, {'Content-Type': 'application/json'}, JSON.stringify(data));

const app = compose(
  use('/pingback', accessControl, send(200, '')),
  use('/authorization', accessControl, json({})),
  use(
    '/static',
    cors,
    serve({root: path.join(__dirname, '..', '..', 'static')}),
  ),
  apply(request, url, async (req, {path}) => {
    const {status, headers, markup} = await render({
      path,
      locale: 'en-US',
    });
    return send(status, headers, markup);
  }),
);

const port = process.env.PORT || 8080;

listen(app, port);
