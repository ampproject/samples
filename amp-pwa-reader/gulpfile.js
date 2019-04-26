const DIST_MODE = process.argv[process.argv.length-1] === 'dist';

/* Dependencies */
let uglifyes = require('uglify-es');
let composer = require('gulp-uglify/composer');
const uglify = composer(uglifyes, console);
const gulp = require('gulp');
const noop = require('gulp-noop');
const replace = require('gulp-replace');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const insert = require('gulp-insert');
const rename = require('gulp-rename');
const gls = require('gulp-live-server');
const historyApiFallback = require('connect-history-api-fallback');
const fs = require('fs');
const del = require('del');
const workboxBuild = require('workbox-build');

const paths = {
  styles: {
    src: 'src/sass/**/*.scss',
    dest: 'dist/'
  },
  page: {
    src: 'src/*.*',
    dest: 'dist/'
  },
  scripts: {
    src: [
      'src/js/History.js',
      'src/js/Backend.js',
      'src/js/Evented.js',
      'src/js/DragObserver.js',
      'src/js/ShadowReader.js',
      'src/js/init.js',
      'src/js/FeedReader.js',
      'src/js/Nav.js',
      'src/js/Card.js',
      'src/js/Article.js',
      '.tmp/inline.css.js'
    ],
    dest: '.tmp/'
  },
  images: {
    src: 'src/img/**/*',
    dest: 'dist/img'
  },
  server: {
    src: 'src/server/**/*',
    dest: 'dist/server'
  }
}

function copy() {
  gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest));
  gulp.src(paths.server.src)
    .pipe(gulp.dest(paths.server.dest));
  return gulp.src(paths.page.src)
    .pipe(gulp.dest(paths.page.dest));
}

function styles() {
  return gulp.src(paths.styles.src)
    .pipe(plumber())
    .pipe(sass(DIST_MODE ? { outputStyle: 'compressed' } : {}))
    .pipe(autoprefixer({ browsers: ['> 10%'] }))
    .pipe(gulp.dest(paths.styles.dest));
}

// Build JS that embeds a CSS file in a JS object property
function css2JSProperty() {
  return gulp.src(paths.styles.dest + 'inline.css', { allowEmpty: true })
    .pipe(insert.wrap("shadowReader.backend.inlineCSS = `\n", "\n`"))
    .pipe(rename('inline.css.js'))
    .pipe(gulp.dest(paths.scripts.dest));
}

// Transform JS files as desired
function processScripts() {
  return gulp.src(paths.scripts.src, { allowEmpty: true })
    .pipe(plumber())
    .pipe(concat('scripts.js'))
    .pipe(DIST_MODE ? uglify({
      mangle: {
        safari10: true
      }
    }) : noop())
    .pipe(gulp.dest(paths.scripts.dest));
}

// Scripts get built in a two-step process:
//   First, transform a subset of our CSS files into JS object properties, for use by front-end JS.
//   Second, process all JS files, including the ones we just built, as desired.
const scripts = gulp.series(css2JSProperty, processScripts);

// Make front-end JS files into back-end modules by appending module.exports = {name};
// Assumes the files consist of a class whose name is identical to that of the file.
function server() {
  const modules = ['Backend'];

  for (let module of modules) {
    let js = modularizeJS(module);
    var retval = gulp.src('src/js/' + module + '.js')
      .pipe(insert.append(js))
      .pipe(gulp.dest(paths.server.dest));
  }

  return retval;
}

function inline() {
  let css = fs.existsSync('./dist/main.css');
  let scripts = fs.existsSync('./.tmp/scripts.js');

  return gulp.src('src/index.html')
    .pipe(css ?
      replace('/* REPLACED-INLINE-STYLESHEET */', fs.readFileSync('./dist/main.css', 'utf8')) :
      noop())
    .pipe(scripts ?
      replace('/* REPLACED-INLINE-JAVASCRIPT */', fs.readFileSync('./.tmp/scripts.js', 'utf8')) :
      noop())
    .pipe(gulp.dest('dist/'));
}

function clean() {
  return del([
    '.tmp',
    'dist/main.css'
  ]);
}

function modularizeJS(name) {
  return '\nmodule.exports = ' + name + ';';
}

/* Generates a complete ServiceWorker, with precaching and runtime caching rules. */
function buildSW() {
  // This will return a Promise
  return workboxBuild.generateSW({
    globDirectory: './dist/',
    // Static precaching of shell
    globPatterns: [
      'img/*.{svg,png,jpg}', 'index.html', 'inline.css'
    ],
    swDest: './dist/sw.js',
    // Register main route for all navigation links to pages
    navigateFallback: 'index.html',
    navigateFallbackBlacklist: [/img\/.*/, /\.(js|css)/],
    // Cache external libraries and fonts
    runtimeCaching: [
      {
        urlPattern: new RegExp('^https://cdn\.ampproject\.org/'),
        handler: 'staleWhileRevalidate',
      },
      {
        urlPattern: new RegExp('^https://cdn\.polyfill\.io/'),
        handler: 'staleWhileRevalidate',
      },
      {
        urlPattern: new RegExp('^https://pasteup\.guim\.co\.uk/fonts/'),
        handler: 'cacheFirst',
      },
      // Cache a number of YQL queries, but only for the offline scenario
      {
        urlPattern: new RegExp('^https://query\.yahooapis\.com/v1/public/'),
        handler: 'networkFirst',
      },
      // Cache a number of images
      {
        urlPattern: new RegExp('^https://i\.guim\.co\.uk/img/'),
        handler: 'cacheFirst',
        options: {
          cacheName: 'images',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 7 * 24 * 60 * 60,
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
    // Make sure new versions of the Service Worker activate immediately
    clientsClaim: true,
    skipWaiting: true,
  }).then(({count, size, warnings}) => {
    // Optionally, log any warnings and details.
    warnings.forEach(console.warn);
    console.log(`${count} files will be precached, totaling ${size} bytes.`);
  });
}


var dist = gulp.series(gulp.parallel(copy, styles, scripts, server), inline, buildSW);


function watch() {
  const serverInstance = gls.new(paths.server.dest + '/server.js', process.env.PORT || 8080);
  serverInstance.start();

  gulp.watch(paths.scripts.src, gulp.series(scripts, inline));
  gulp.watch(paths.styles.src, gulp.series(styles, inline, buildSW));
  gulp.watch(paths.page.src, dist);
  gulp.watch(paths.images.src, dist);   // of course, this could be a smaller task if builds ever got too slow
  gulp.watch(paths.server.src, dist);   // same
}


var dev = gulp.series(dist, watch);

gulp.task('dev', dev);
gulp.task('dist', dist);
gulp.task('default', dev);
