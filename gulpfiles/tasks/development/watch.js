var gulp   = require('gulp');
var config = require('../../config').watch;

/**
 * Start browsersync task and then watch files for changes
 */
gulp.task('watch', ['browsersync'], function() {
  gulp.watch(config.sass,    ['modernizr', 'sass']);
  gulp.watch(config.scripts, ['modernizr', 'scripts', 'jshint']);
  gulp.watch(config.images, ['images']);
  gulp.watch(config.html, ['html']);
});
