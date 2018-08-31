const gulp = require('gulp');
const gulpAmpValidator = require('gulp-amphtml-validator');

const paths = {
  templateHtml: 'templates/**/*.htm*'
};

gulp.task('validate', () => {
  return gulp.src(paths.templateHtml)
    .pipe(gulpAmpValidator.validate())
    .pipe(gulpAmpValidator.format())
    .pipe(gulpAmpValidator.failAfterError());
});

gulp.task('default', ['validate'], function () {
});
