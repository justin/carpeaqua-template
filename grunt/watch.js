'use strict';

module.exports = {
  options: {
    cwd: '<%= dirs.source %>'
  },
  sass: {
    files: ['css/**/*.{scss,sass}'],
    tasks: ['sass', 'cssmin']
  },
  js: {
    files: 'js/source/**/*.js',
    tasks: ['jshint', 'uglify']
  },
  images: {
    files: ['images/**/*.{png,jpg,gif}'],
    tasks: ['imagemin']
  }
};