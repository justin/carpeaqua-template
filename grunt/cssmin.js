
'use strict';

module.exports = {
  options: {
    keepSpecialComments: 1
  },
  minify: {
    expand: true,
    cwd: '<%= dirs.source %>/css/build',
    src: ['*.css', '!*.min.css'],
    ext: '.css'
  }
};
