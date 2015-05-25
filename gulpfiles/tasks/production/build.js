var gulp        = require('gulp');
var runSequence = require('run-sequence');

/**
 * Run all tasks needed for a build in defined order
 */
gulp.task('build:production', function(callback) {
  runSequence('delete', 'html:production', 'modernizr',
  [
    'sass',
    'scripts',
    'images'
  ],
  [
    'optimize:css',
    'optimize:js',
    'optimize:images'
  ],
  'revision',
  'rev:collect',
  callback);
});
