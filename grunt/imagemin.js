'use strict';

module.exports = {
  dist: {
    options: {
      optimizationLevel: 7,
      progressive: true,
      interlaced: true
    },
    files: [{
      expand: true,
      cwd: '<%= dirs.source %>/images/',
      src: ['**/*.{png,jpg,gif}'],
      dest: '<%= dirs.source %>/images/'
    }]
  }
};
