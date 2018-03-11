'use strict';

module.exports = {
  plugins: {
    files: {
      '<%= dirs.source %>/js/plugins.min.js': [
        'node_modules/jquery/dist/jquery.js',
        'node_modules/bigfoot/dist/bigfoot.js',
        'node_modules/highlight/src/highlight.js',
      ]
    }
  },
  main: {
    files: {
      '<%= dirs.source %>/js/main.min.js': [
        'assets/js/source/main.js'
      ]
    }
  }
};
