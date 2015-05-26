var src               = 'app';
var build             = 'build';
var development       = 'build/development';
var production        = 'build/production';
var srcAssets         = 'app/assets';
var developmentAssets = 'build/assets';
var productionAssets  = 'build/production/assets';

module.exports = {
  browsersync: {
    development: {
      server: {
        baseDir: [development, build, src]
      },
      port: 9999,
      files: [
        development + '/**/*.html',
        developmentAssets + '/css/*.css',
        developmentAssets + '/js/*.js',
        developmentAssets + '/images/**'
      ]
    },
    production: {
      server: {
        baseDir: [production]
      },
      port: 9998
    }
  },

  delete: {
    src: [build, srcAssets + '/javascripts/modernizr-custom.js']
  },

  sass: {
    src:  srcAssets + '/scss/**/*.{sass,scss}',
    dest: developmentAssets + '/css',
    options: {
      noCache: true,
      compass: false,
      bundleExec: true,
      sourcemap: true,
      sourcemapPath: '../../assets/scss'
    }
  },

  html: {
    development: {
      src:  [
        src + '/**/*.html',
        '!' + src + '/_bower_components/**'
      ],
      dest: development
    },
    production: {
      src:  [
        src + '/**/*.html',
        '!' + src + '/_bower_components/**'
      ],
      dest: production
    }
  },

  autoprefixer: {
    browsers: [
      'last 2 versions',
      'safari 5',
      'ie 8',
      'ie 9',
      'opera 12.1',
      'ios 6',
      'android 4'
    ],
    cascade: true
  },

  browserify: {
    // Enable source maps
    debug: true,
    // Additional file extensions to make optional
    extensions: [],
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
      entries:    './' + srcAssets + '/javascripts/head.js',
      dest:       developmentAssets + '/js',
      outputName: 'head.js',
      ignore: []
    }, {
      entries:    './' + srcAssets + '/javascripts/application.js',
      dest:       developmentAssets + '/js',
      outputName: 'application.js',
      // We require Modernizr and Pace in head.js so exclude it from here
      ignore: ['modernizr', 'pace']
    }]
  },

  modernizr: {
    src: [
      srcAssets + '/javascripts/**/*.js',
      srcAssets + '/scss/**/*.scss'
    ],
    customizr: {
      options: [
        "setClasses",
        "addTest"
      ]
    },
    dest: srcAssets + '/javascripts/',
    filename: 'modernizr-custom.js'
  },

  images: {
    src:  srcAssets + '/images/**/*',
    dest: developmentAssets + '/images'
  },

  watch: {
    sass:    srcAssets + '/scss/**/*.{sass,scss}',
    scripts: [
      srcAssets + '/javascripts/**/*.js',
      '!' + srcAssets + '/javascripts/modernizr-custom.js'
    ],
    images: srcAssets + '/images/**/*.{jpg,png}',
    html: src + '/**/*.html'
  },

  jshint: {
    src: [
      srcAssets + '/javascripts/*.js',
      '!' + srcAssets + '/javascripts/modernizr-custom.js'
    ]
  },

  optimize: {
    css: {
      src:  developmentAssets + '/css/*.css',
      dest: productionAssets + '/css/',
      options: {
        keepSpecialComments: 0
      }
    },
    js: {
      src:  developmentAssets + '/js/*.js',
      dest: productionAssets + '/js/',
      options: {}
    },
    images: {
      src:  developmentAssets + '/images/**/*.{jpg,jpeg,png,gif}',
      dest: productionAssets + '/images/',
      options: {
        optimizationLevel: 3,
        progessive: true,
        interlaced: true
      }
    }
  },

  revision: {
    src: {
      assets: [
        productionAssets + '/css/*.css',
        productionAssets + '/js/*.js',
        productionAssets + '/images/**/*'
      ],
      base: production
    },
    dest: {
      assets: production,
      manifest: {
        name: 'manifest.json',
        path: productionAssets
      }
    }
  },

  collect: {
    src: [
      productionAssets + '/manifest.json',
      production + '/**/*.{html,json,css,js}'
    ],
    dest: production
  }
};
