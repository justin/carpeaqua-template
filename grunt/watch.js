'use strict';

module.exports = {
  options: {
    cwd: '<%= dirs.source %>'
  },
  css: {
    files: ['css/**/*.{scss,sass}'],
    tasks: ['dart-sass', 'cssmin']
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
