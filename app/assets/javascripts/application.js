/* global Modernizr, Pace, skrollr */

require('modernizr');
require('skrollr');
require('pace');
require('picturefill');

var scrolling = require('./modules/scrolling');
var city = require('./modules/city');
var svgstars = require('./modules/svgstars');
var viewport = require('./modules/viewport');
var device = require('./modules/device');
var debounce = require('./modules/debounce');

// Disable scrolling as soon as possible
// As soon as all elements will be loaded scrolling will be enabled
scrolling.disable();

document.getElementById('YGLF-intro').classList.remove('is-hidden');

if (Modernizr.svg && viewport.width() > 480 && !device.isMobileOrTablet()) {

  svgstars.initPaper();
  svgstars.initFrame();
  svgstars.initStars();
  svgstars.initBackgroundGradient();

} else {

  var logo = document.getElementById('Logo');
  logo.dataset['400'] = "opacity: 1; display: inline;";
  logo.removeAttribute('data-1100');
  logo.removeAttribute('data-1200');

}


Pace.on('done', function(){

  scrolling.enable();

  document.getElementById('ScrollingHelpfulMessage').classList.remove('is-hidden');

  // Remember to perform this after YGLF-intro container is unhidden
  city.update();

});


var SKROLL = skrollr.init();

var resizeHandler = debounce(function() {
  svgstars.updatePaper();
  svgstars.updateFrame();
  svgstars.positionFrameInCenter();
  svgstars.removeStars();
  svgstars.addStars();
  svgstars.updateBackgroundGradient();

  SKROLL.refresh();
  if (SKROLL.getScrollTop() > 299) {
    SKROLL.setScrollTop(299);
  }
  city.update();
}, 250);

window.addEventListener('resize', resizeHandler);
