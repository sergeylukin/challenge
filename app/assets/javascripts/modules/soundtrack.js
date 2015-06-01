var viewport = require('./viewport');

module.exports = {
  init: function() {
    var drawVisual;
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    var audio = document.getElementById('Soundtrack');
    // audio.play();

    var analyser = audioCtx.createAnalyser();
    analyser.minDecibels = -90;
    analyser.maxDecibels = -10;
    analyser.smoothingTimeConstant = 0.85;

    // Our <audio> element will be the audio source.
    var source = audioCtx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    var canvas = document.getElementById('Visualizer'),
        canvasCtx = canvas.getContext('2d');

    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;

    var visualize = function(time) {

      analyser.fftSize = 512;
      var bufferLength = analyser.frequencyBinCount;
      var dataArray = new Uint8Array(bufferLength);


      var draw = function() {
        drawVisual = requestAnimationFrame(draw);

        analyser.getByteFrequencyData(dataArray);

        canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
        canvasCtx.lineCap = 'round';

        var barHeight;
        var spacerWidth = 2;
        var numBars = 80;
        var barWidth = (WIDTH - spacerWidth * (numBars - 1)) / numBars;
        var x = 0;

        // Draw rectangle for each frequency bin.
        for (var i = 0; i < bufferLength; ++i) {
          if (i+1  === numBars) {
            barWidth -= .35;
          }
          barHeight = dataArray[i];
          canvasCtx.fillStyle = '#fff';
          canvasCtx.fillRect(x, HEIGHT, barWidth, -barHeight/5);

          x += barWidth + spacerWidth;
        }

      };

      draw();

    };

    var unvisualize = function() {
      if (audio.paused) {
        cancelAnimationFrame(drawVisual);
      }
    };

    var updatePosition = function() {
      var logoEl = document.getElementById('LogoImg'),
          logoWidth = logoEl.clientWidth,
          logoHeight = logoEl.clientHeight,
          logoLeftOffset = logoEl.getBoundingClientRect().left;

      canvas.setAttribute('width', logoWidth);
      canvas.style.left = logoLeftOffset + 'px';
      canvas.style.top = (viewport.height()/2 - logoHeight/2 - canvas.height) + 'px';
      canvas.style.width = logoWidth + 'px';
      WIDTH = logoWidth;

      var playerEl = document.querySelector('.js-player');
      playerEl.classList.remove('is-hidden');
      playerEl.style.left = logoLeftOffset + 'px';
      playerEl.style.top = (viewport.height()/2 + logoHeight/2 - playerEl.clientHeight) + 'px';
    };

    updatePosition();
    // ...call requestAnimationFrame() and render the analyser's output to canvas.
    // visualize();

    window.addEventListener('resize', function(e) {
      updatePosition();
    });

    // Register play button click events
    var playButton = document.getElementById('PlayButton');
    playButton.addEventListener('click', function(e) {
      e.preventDefault();
      if (audio.paused) {
        audio.play();
        visualize();
        playButton.classList.remove('icon-play');
        playButton.classList.add('icon-pause');
      } else {
        audio.pause();
        setTimeout(function() {
          unvisualize();
        }, 10000);
        playButton.classList.remove('icon-pause');
        playButton.classList.add('icon-play');
      }
    });

    audio.addEventListener('ended', function(e) {
      setTimeout(function() {
        unvisualize();
      }, 10000);
      if (playButton.classList.contains('icon-pause')) {
        playButton.classList.remove('icon-pause');
        playButton.classList.add('icon-play');
      }
    });
  }
};
