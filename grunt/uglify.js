'use strict';

module.exports = {
  plugins: {
    files: {
      'build/js/plugins.min.js': [
        'node_modules/jquery/dist/jquery.js',
        'node_modules/bigfoot/dist/bigfoot.js',
      ]
    }
  },
  main: {
    files: {
      'build/js/main.min.js': [
        'assets/js/main.js'
      ]
    }
  }
};
