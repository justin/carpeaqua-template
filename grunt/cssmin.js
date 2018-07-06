
'use strict';

module.exports = {
  options: {
    keepSpecialComments: 1
  },
  minify: {
    expand: true,
    cwd: 'build/css/',
    src: ['*.css', '!*.min.css'],
    dest: 'build/css/',
  }
};
