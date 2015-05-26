var viewport = require('./viewport');

module.exports = {

  update: function() {
    var cityEl = document.getElementById('Telaviv'),
        cityHeight = cityEl.clientHeight,
        viewportHeight = viewport.height();
        availableSpaceFromTop = viewportHeight - cityHeight,
        desiredSpaceFromTop = 50 / 100 * viewportHeight;

    if (availableSpaceFromTop < desiredSpaceFromTop) {

      cityEl.style.top = desiredSpaceFromTop + 'px';
      cityEl.style.bottom = 'auto';

    } else {

      cityEl.style.top = 'auto';
      cityEl.style.bottom = 0;

    }
  }

};
