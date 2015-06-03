/* global Snap */

require('snap');
var viewport = require('./viewport');
var letters = require('./letters');
var rand = require('./rand');

var paper,

    Points = [],
    frameStroke,
    group,
    backgroundGradient,

    textXCorrection,
    textYCorrection,
    logoWidth,
    logoHeight,
    logoXOffset,
    logoYOffset,
    logoXCenteredOffset,
    logoYCenteredOffset;


module.exports = {

  initialized: function() {
    return (paper && frameStroke && group && backgroundGradient);
  },

  initPaper: function() {
    paper = Snap(viewport.width(), viewport.height());
    paper.appendTo(document.getElementById('YGLF-intro'));
    paper.node.style.position = 'fixed';

    this.updateLogoSizes();

    group = paper.g();
    this.updateGroup();

    initialized = true;
  },

  updatePaper: function() {
    paper.attr({
      width: viewport.width(),
      height: viewport.height()
    });

    this.updateLogoSizes();
    this.updateGroup();
  },

  updateLogoSizes: function() {
    // We know that our logo's
    // most left point is positioned
    // 100.4px from the left edge
    // and most top point is positioned
    // 118px from the top edge
    // and most right point is positioned
    // 409.4px from the left edge
    // and most bototm point is positioned
    // 326.3 from the top edge
    //
    // Padding inside the frame is 32px/32px
    //
    // + 100px/118px of default margin result
    // in following corrections to start from
    // zero coordinates:
    textXCorrection = -68;
    textYCorrection = -82;

    // Width is 309px+padding and height is 208.3px+padding
    logoWidth = 383;
    logoHeight = 275;

    // Specify the offset from left/top edges after first transition
    // In our case we want to offset 10% of the viewport size
    logoXOffset = 10 / 100 * viewport.width();
    logoYOffset = 10 / 100 * viewport.height();

    logoXCenteredOffset = viewport.width() / 2 - logoWidth / 2;
    logoYCenteredOffset = viewport.height() / 2 - logoHeight / 2;
  },

  initFrame: function() {
    frameStroke = paper.rect(viewport.width() / 2 - logoWidth / 2, viewport.height() / 2 - logoHeight / 2, logoWidth, logoHeight);
    frameStroke.attr({
      stroke: 'white',
      fill: 'none'
    });

    this.updateFrame();

    group.add(frameStroke);
  },

  updateFrame: function() {
    frameStroke.attr({
      width: logoWidth,
      height: logoHeight,
      'data-200':   '@transform[cubic]: translate('+(viewport.width() / 2)+' ' + (viewport.height() / 2) + ') scale(0) rotate(0 ' + (viewport.width() / 2) + ' ' + (viewport.height() / 2) + ');',
      'data-900': '@transform[cubic]: translate(-'+(logoXCenteredOffset-logoXOffset)+' -'+(logoYCenteredOffset-logoYOffset)+') scale(1) rotate(-180 ' + (viewport.width() / 2) + ' ' + (viewport.height() / 2) + ');'
      });
  },

  positionFrameInCenter: function() {
    frameStroke.attr({
      x: viewport.width() / 2 - logoWidth / 2,
      y: viewport.height() / 2 - logoHeight / 2
    });
  },

  initStars: function() {
    this.addStars();
  },

  addStars: function() {
    // Iterate over all known letters SVG paths
    // Create SVG particles along each letter
    // Randomly position each particle like stars in the universe
    Array.prototype.forEach.call(letters, function(letterPath) {

      // Create particle for every 4th point along the letter path
      for (var i = 0; i < Snap.path.getTotalLength(letterPath); i += 4) {
        var p = Snap.path.getPointAtLength(letterPath, i),
            originalXcoordinate = p.x + textXCorrection + logoXOffset,
            originalYcoordinate = p.y + textYCorrection + logoYOffset,
            randomXcoordinate = originalXcoordinate + rand(rand(-400, -200), rand(200, 1000)),
            randomYcoordinate = originalYcoordinate + rand(rand(-300, -100), rand(300, 600)),
            centeredXcoordinate = p.x + textXCorrection + logoXCenteredOffset,
            centeredYcoordinate = p.y + textYCorrection + logoYCenteredOffset,
            randomOpacity = rand(.01, .99);

        var point = paper.circle(originalXcoordinate, originalYcoordinate, 1);
        point.attr({
          fill: 'white',
          opacity: randomOpacity,
          cx: randomXcoordinate,
          cy: randomYcoordinate,
          'data-200':   '@cx: ' + randomXcoordinate + ';' +
                      '@cy: ' + randomYcoordinate + ';' +
                      'opacity: ' + randomOpacity,
          'data-900': '@cx: ' + originalXcoordinate + ';' +
                      '@cy: ' + originalYcoordinate + ';' +
                      'opacity: 1'
        });

        Points.push(point);
        group.add(point);

      }

    });
  },

  removeStars: function() {
    Array.prototype.forEach.call(Points, function(Point) {
      Point.remove();
    });
  },

  updateGroup: function() {
    group.attr({
      'data-600': 'opacity: 1;@transform[cubic]: translate(0 0);',
      'data-1000': '@transform[cubic]: translate(' + (logoXCenteredOffset - logoXOffset) + ' ' + (logoYCenteredOffset - logoYOffset) + ');',
      'data-1300': 'opacity: 0'
    });
  },

  initBackgroundGradient: function() {
    var gradient = paper.gradient('l(.5, 0, .5, 1)#0000EF-#005BC7-#00ACA4-#00CB96');

    backgroundGradient = paper.rect(0, 0, viewport.width(), viewport.height());
    backgroundGradient.attr({
      opacity: 0,
      fill: gradient,
      'data-1000': 'opacity: 0',
      'data-1200': 'opacity: .4'
    });
  },

  updateBackgroundGradient: function() {
    backgroundGradient.attr({
      width: viewport.width(),
      height: viewport.height()
    });
  }

};
