'use strict';

module.exports = {
  main: {
    options: {
      archive: "<%= dirs.production %>/carpeaqua.zip"
    },
    files: [
      {
        expand: true,
        cwd: '<%= dirs.staging %>',
        src: ['**/*'],
        dest: '<%= dirs.production %>'
      }
    ]
  }
};
