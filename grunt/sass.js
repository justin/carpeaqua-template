'use strict';

module.exports = {
  options: {
    sourcemap: 'none',
    style: 'expanded',
    bundleExec: true
  },
  files: {
    expand: true,
    cwd: 'assets/css',
    src: ['**/*.scss'],
    dest: 'build/css',
    ext: '.css'
  }
};
