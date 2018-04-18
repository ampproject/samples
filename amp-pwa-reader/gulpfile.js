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
const browserSync = require('browser-sync').create();
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
      'src/js/Article.js'
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

function scripts() {
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

function modularizeJS(name) {
  return "\nmodule.exports = " + name + ';';
}

function watch() {
  browserSync.init({
    server: false,
    ui: false
  });

  const express = gls.new(paths.server.dest + '/server.js');
  express.start();

  gulp.watch(paths.scripts.src, gulp.series(scripts, inline));
  gulp.watch(paths.styles.src, gulp.series(styles, inline, injectManifest));
  gulp.watch(paths.page.src, dist);
  gulp.watch(paths.images.src, dist);   // of course, this could be a smaller task if builds ever got too slow
  gulp.watch(paths.server.src, dist);   // same
}


var dist = gulp.series(gulp.parallel(copy, styles, scripts, server), inline, injectManifest);
var dev = gulp.series(dist, watch);

gulp.task('dev', dev);
gulp.task('dist', dist);
gulp.task('default', dev);
