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
      cwd: '<%= dirs.source %>',
      src: ['/images/**/*.{png,jpg,gif}'],
      dest: '/images/build/'
    }]
  }
};
