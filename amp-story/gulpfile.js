const gulp = require('gulp');
const gulpAmpValidator = require('gulp-amphtml-validator');
const gulpStylelint = require('gulp-stylelint');
const gulpHtmllint = require('gulp-htmllint');

const paths = {
  templates: 'templates/**/*.htm*'
};

gulp.task('validate', () => {
  return gulp.src(paths.templates)
      .pipe(gulpAmpValidator.validate())
      .pipe(gulpAmpValidator.format())
      .pipe(gulpAmpValidator.failAfterError());
});


gulp.task('lint-css', () => {
  return gulp.src(paths.templates)
      .pipe(gulpStylelint({
        reporters: [
          { formatter: 'string', console: true },
        ]
      }));
});


gulp.task('lint-html', () => {
  return gulp.src(paths.templates)
      .pipe(gulpHtmllint({}));
});

gulp.task('lint', ['lint-html', 'lint-css'], () => {});
gulp.task('default', ['validate', 'lint'], () => {});
