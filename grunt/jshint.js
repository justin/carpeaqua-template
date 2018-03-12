'use strict';

module.exports = {
  options: {
    jshintrc: '.jshintrc',
    force: true
  },
  all: [
    'Gruntfile.js',
    '<%= dirs.source %>/js/*.js'

  ]
};
