'use strict';

module.exports = {
  plugins: {
    files: {
      '<%= dirs.source %>/js/build/plugins.min.js': [
        '<%= dirs.source %>/../node_modules/jquery/dist/jquery.js',
        '<%= dirs.source %>/../node_modules/bigfoot/dist/bigfoot.js',
        '<%= dirs.source %>/../node_modules/highlight/src/highlight.js',
      ]
    }
  },
  main: {
    files: {
      '<%= dirs.source %>/js/build/main.min.js': [
        '<%= dirs.source %>/js/main.js'
      ]
    }
  }
};
