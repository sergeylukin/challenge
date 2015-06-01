var gulp   = require('gulp');
var config = require('../../config').audio.development;

/**
 * Copy soundtracks
 */
gulp.task('audio', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});
