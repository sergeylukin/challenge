var gulp    = require('gulp');
var ghPages = require('gulp-gh-pages');

gulp.task('deploy', ['build:production'], function() {
  return gulp.src('./build/production/**/*')
    .pipe(ghPages());
});
