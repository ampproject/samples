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
const scriptsGlob = [ 'src/js/**/*.js', 'src/js/init.js' ];
const stylesGlob = 'src/sass/**/*.scss';
const imagesGlob = 'src/img/**/*';
const pagesGlob = 'src/*.html';

gulp.task('copy', function() {
  gulp.src(pagesGlob)
    .pipe(gulp.dest('dist/'));

  gulp.src(imagesGlob)
    .pipe(gulp.dest('dist/img'));
});

gulp.task('inline', [ 'sass', 'scripts', 'copy' ], function() {
  gulp.src(pagesGlob)
    .pipe(replace('/* REPLACED-INLINE-STYLESHEET */', fs.readFileSync('./dist/main.css', 'utf8')))
    .pipe(replace('/* REPLACED-INLINE-JAVASCRIPT */', fs.readFileSync('./dist/tmp/app.js', 'utf8')))
    .pipe(gulp.dest('dist/'));
});

gulp.task('clean-tmp', ['inline'], function() {
  return del([
    'dist/tmp',
    'dist/main.css'
  ]);
});

// Sass
gulp.task('sass', function() {
  return gulp.src(stylesGlob)
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer({ browsers: ['> 10%'] }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('scripts', function() {
  return gulp.src(scriptsGlob)
      .pipe(plumber())
      .pipe(concat('app.js'))
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
    }
  });

  gulp.watch(scriptsGlob, [ 'scripts', 'clean-tmp', 'reload' ]);
  gulp.watch(stylesGlob, [ 'sass', 'clean-tmp', 'reload' ]);
  gulp.watch(pagesGlob, [ 'copy', 'clean-tmp', 'reload' ]);

});

// Default Task
gulp.task('default', [ 'copy', 'sass', 'scripts' , 'inline', 'clean-tmp', 'watch' ]);
gulp.task('dist', [ 'copy', 'sass', 'scripts', 'inline', 'clean-tmp' ]);