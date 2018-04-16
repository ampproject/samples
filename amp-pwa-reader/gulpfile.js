const DIST_MODE = process.argv[process.argv.length-1] === 'dist';

/* Dependencies */
let uglifyes = require('uglify-es');
let composer = require('gulp-uglify/composer');
const uglify = composer(uglifyes, console);
const gulp = require('gulp');
const gutil = require('gulp-util');
const replace = require('gulp-replace');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const insert = require('gulp-insert');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const debug = require('gulp-debug');
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
  }
}

function copy() {
  gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest));
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

function cssJsScripts() {
  return gulp.src(paths.styles.dest + 'inline.css')
    .pipe(insert.wrap("shadowReader.backend.inlineCSS = `\n", "\n`"))
    .pipe(rename('inline.css.js'))
    .pipe(gulp.dest(paths.scripts.dest));
}

function jsScripts() {
  return gulp.src(paths.scripts.src)
    .pipe(plumber())
    .pipe(concat('scripts.js'))
    .pipe(DIST_MODE ? uglify({
      mangle: {
        safari10: true
      }
    }) : gutil.noop())
    .pipe(gulp.dest(paths.scripts.dest));
}

const scripts = gulp.series(cssJsScripts, jsScripts);

function inline() {
  let css = fs.existsSync('./dist/main.css');
  let scripts = fs.existsSync('./.tmp/scripts.js');

  return gulp.src('src/index.html')
    .pipe(css ?
      replace('/* REPLACED-INLINE-STYLESHEET */', fs.readFileSync('./dist/main.css', 'utf8')) :
      gutil.noop())
    .pipe(scripts ?
      replace('/* REPLACED-INLINE-JAVASCRIPT */', fs.readFileSync('./.tmp/scripts.js', 'utf8')) :
      gutil.noop())
    .pipe(gulp.dest('dist/'));
}

function clean() {
  return del([
    '.tmp',
    'dist/main.css'
  ]);
}

function injectManifest() {
  return workboxBuild.injectManifest({
    globDirectory: './dist/',
    globPatterns: [ 'img/*.{svg,png,jpg}', 'index.html', 'inline.css' ],
    globIgnores: ['admin.html'],
    swSrc: './src/sw.js',
    swDest: './dist/sw.js'
  });
}

function watch() {
  browserSync.init({
    server: {
      baseDir: 'dist/',
      middleware: [historyApiFallback()]
    },
    ui: false
  });

  gulp.watch(paths.scripts.src, gulp.series(jsScripts, inline));
  gulp.watch(paths.styles.src, gulp.series(styles, scripts, inline, injectManifest));
  gulp.watch(paths.page.src, dist);
  gulp.watch(paths.images.src, dist);
}


var dist = gulp.series(gulp.parallel(copy, styles, scripts), inline, injectManifest);
var dev = gulp.series(dist, watch);

gulp.task('dev', dev);
gulp.task('dist', dist);
gulp.task('default', dev);