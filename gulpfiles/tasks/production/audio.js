var gulp   = require('gulp');
var config = require('../../config').audio.production;

/**
 * Copy soundtracks
 */
gulp.task('audio:production', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});

