import fs from 'fs';

import copydir from 'copy-dir';
import path from 'path';
import rimraf from 'rimraf';

import render from '/server/render';

const DIST_DIR = path.join(__dirname, '..', 'dist');
const STATIC_ASSETS_DIR = path.join(__dirname, '..', 'static');
const APP_ROUTES = [
  {
    path: '/',
    locale: 'en-US',
  },
  {
    path: '/stories/behind-the-story/',
    locale: 'en-US',
  },
  {
    path: '/stories/animations/',
    locale: 'en-US',
  },
  {
    path: '/stories/media-components/',
    locale: 'en-US',
  },
  {
    path: '/stories/layout/',
    locale: 'en-US',
  },
  {
    path: '/stories/links-cta-ads/',
    locale: 'en-US',
  },
  {
    path: '/stories/wrap-up/',
    locale: 'en-US',
  },
  {
    path: '/stories/millennials/',
    locale: 'en-US',
  },
];

/* eslint no-console: 0 */
const buildAppRoutes = async (routes) => {
  for (const config of routes) {
    console.log(`-- Building path: ${config.path}`);
    const routePath = `${DIST_DIR}${config.path}`;
    const {markup} = await render(config);
    await fs.promises.mkdir(routePath, {recursive: true});
    await fs.promises.writeFile(`${routePath}index.html`, markup);
    console.log(`-- Successfully built: ${config.path}`);
  }
};

const buildStatic = async () => {
  console.log("Cleaning '/dist' directory...");
  rimraf.sync(DIST_DIR);
  await fs.promises.mkdir(DIST_DIR);

  console.log("Copying '/static' directory to '/dist/static'...");
  copydir.sync(STATIC_ASSETS_DIR, `${DIST_DIR}/static`);

  console.log('Building page routes...');
  await buildAppRoutes(APP_ROUTES);
};

buildStatic();
