var gulp = require('gulp');
var config = require('../../config').html.development;

/**
 * Copy HTML files from app folder to build folder
 */
gulp.task('html', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});
