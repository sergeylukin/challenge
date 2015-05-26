var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0];

module.exports = {

  width: function() {
    return w.innerWidth || e.clientWidth || g.clientWidth;
  },

  height: function() {
    return w.innerHeight|| e.clientHeight|| g.clientHeight;
  }

};
