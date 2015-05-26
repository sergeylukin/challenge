/* global Pace, skrollr */

require('modernizr');
require('skrollr');
require('pace');
require('picturefill');

var scrolling = require('./modules/scrolling');
var city = require('./modules/city');
var svgstars = require('./modules/svgstars');

// Disable scrolling as soon as possible
// As soon as all elements will be loaded scrolling will be enabled
scrolling.disable();


svgstars.initPaper();
svgstars.initFrame();
svgstars.initStars();
svgstars.initBackgroundGradient();


Pace.on('start', function(){

  document.querySelector('.AuthorMessage').classList.remove('is-hidden');

});


Pace.on('done', function(){

  scrolling.enable();

  document.getElementById('YGLF-intro').classList.remove('is-hidden');

  // Remember to perform this after YGLF-intro container is unhidden
  city.update();

});


var SKROLL = skrollr.init();


window.addEventListener('resize', function(evt) {
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
});
