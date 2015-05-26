require('modernizr');
require('pace');

// Make sure to scroll to top when reloading page
window.onbeforeunload = function() {
  window.scrollTo(0,0);
}
