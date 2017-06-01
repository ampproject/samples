
/* Dependencies */
let uglifyes = require('uglify-es');
let composer = require('gulp-uglify/composer');
const uglify = composer(uglifyes, console);
const gulp = require('gulp');
const replace = require('gulp-replace');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const historyApiFallback = require('connect-history-api-fallback');
const fs = require('fs');
const del = require('del');

/* Working Files */
const initScriptsGlob = [
  'src/js/History.js',
  'src/js/Backend.js',
  'src/js/backends/TheGuardian.js',
  'src/js/backends/CNET.js',
  'src/js/ShadowReader.js',
  'src/js/init.js'
];
const mainScriptsGlob = [
  'src/js/FeedReader.js',
  'src/js/Nav.js',
  'src/js/Card.js',
  'src/js/Article.js'
];
const stylesGlob = 'src/sass/**/*.scss';
const imagesGlob = 'src/img/**/*';
const pagesGlob = 'src/*.*';

gulp.task('copy', function() {
  gulp.src(pagesGlob)
    .pipe(gulp.dest('dist/'));

  gulp.src(imagesGlob)
    .pipe(gulp.dest('dist/img'));
});

gulp.task('inline', [ 'sass', 'scripts-init', 'scripts-main', 'copy' ], function() {
  gulp.src('src/index.html')
    .pipe(replace('/* REPLACED-INLINE-STYLESHEET */', fs.readFileSync('./dist/main.css', 'utf8')))
    .pipe(replace('/* REPLACED-INLINE-JAVASCRIPT-INIT */', fs.readFileSync('./dist/tmp/init.js', 'utf8')))
    .pipe(replace('/* REPLACED-INLINE-JAVASCRIPT-MAIN */', fs.readFileSync('./dist/tmp/main.js', 'utf8')))
    .pipe(gulp.dest('dist/'));
});

gulp.task('inline-dist', [ 'sass-dist', 'scripts-init-dist', 'scripts-main-dist', 'copy' ], function() {
  gulp.src('src/index.html')
    .pipe(replace('/* REPLACED-INLINE-STYLESHEET */', fs.readFileSync('./dist/main.css', 'utf8')))
    .pipe(replace('/* REPLACED-INLINE-JAVASCRIPT-INIT */', fs.readFileSync('./dist/tmp/init.js', 'utf8')))
    .pipe(replace('/* REPLACED-INLINE-JAVASCRIPT-MAIN */', fs.readFileSync('./dist/tmp/main.js', 'utf8')))
    .pipe(gulp.dest('dist/'));
});

gulp.task('clean-tmp', ['inline'], function() {
  return del([
    'dist/tmp',
    'dist/main.css'
  ]);
});

gulp.task('clean-tmp-dist', ['inline-dist'], function() {
  return del([
    'dist/tmp',
    'dist/main.css'
  ]);
});

// Sass
gulp.task('sass', function() {
  return gulp.src(stylesGlob)
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer({ browsers: ['> 10%'] }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('sass-dist', function() {
  return gulp.src(stylesGlob)
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer({ browsers: ['> 10%'] }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('scripts-init', function() {
  return gulp.src(initScriptsGlob)
    .pipe(plumber())
    .pipe(concat('init.js'))
    .pipe(gulp.dest('dist/tmp/'));
});

gulp.task('scripts-init-dist', function() {
  return gulp.src(initScriptsGlob)
    .pipe(plumber())
    .pipe(concat('init.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/tmp/'));
});

gulp.task('scripts-main', function() {
  return gulp.src(mainScriptsGlob)
    .pipe(plumber())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/tmp/'));
});

gulp.task('scripts-main-dist', function() {
  return gulp.src(mainScriptsGlob)
    .pipe(plumber())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/tmp/'));
});

gulp.task('reload', ['clean-tmp'], function() {
  return browserSync.reload();
});

// Watch files For changes
gulp.task('watch', function() {

  browserSync.init({
    server: {
      baseDir: 'dist/',
      middleware: [historyApiFallback()]
    },
    ui: false
  });

  gulp.watch(initScriptsGlob, [ 'scripts-init', 'scripts-main', 'clean-tmp', 'reload' ]);
  gulp.watch(mainScriptsGlob, [ 'scripts-init', 'scripts-main', 'clean-tmp', 'reload' ]);
  gulp.watch(stylesGlob, [ 'sass', 'clean-tmp', 'reload' ]);
  gulp.watch(pagesGlob, [ 'copy', 'clean-tmp', 'reload' ]);
  gulp.watch(imagesGlob, [ 'copy', 'clean-tmp', 'reload' ]);

});

// Default Task
gulp.task('default', [ 'copy', 'sass', 'scripts-init', 'scripts-main', 'inline', 'clean-tmp', 'watch' ]);
gulp.task('dist', [ 'copy', 'sass-dist', 'scripts-init-dist', 'scripts-main-dist', 'inline-dist', 'clean-tmp-dist' ]);
