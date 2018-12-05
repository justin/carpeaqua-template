'use strict';

module.exports = function(grunt) {
    var options = {
      config : {
        src: "grunt/*.js"
      },
      pkg : grunt.file.readJSON('package.json'),
      dirs : {
        source: 'assets',
        staging: 'staging',
        production: 'production'
      }
    };

    // Load our tasks from the `config.src` dir.
    var configs = require( 'load-grunt-configs' )(grunt, options);
    grunt.initConfig(configs);

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('staging', ['clean:staging', 'copy:staging']);
    grunt.registerTask('production', ['clean:production', 'staging', 'compress']);
    grunt.registerTask('default', ['dart-sass', 'cssmin', 'uglify', 'imagemin', 'watch']);
};
