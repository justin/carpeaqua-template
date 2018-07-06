'use strict';

module.exports = {
  dynamic: {
    options: {
      optimizationLevel: 7,
      progressive: true,
      interlaced: true
    },
    files: [{
      expand: true,
      cwd: 'assets/images/',
      src: ['**/*.{png,jpg,gif}'],
      dest: 'build/images/'
    }]
  }
};
