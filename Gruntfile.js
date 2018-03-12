'use strict';

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    var options = {
      config : {
        src: "grunt/*.*"
      },
      pkg : grunt.file.readJSON('package.json'),
      dirs : {
        source: 'assets',
        staging: 'staging',
        production: 'production'
      }
    };

    // Load our tasks from the `config.src` dir.
    var configs = require( 'load-grunt-configs' )( grunt, options);
    grunt.initConfig(configs);

    grunt.registerTask('staging', ['copy:staging']);
    grunt.registerTask('production', ['copy:production']);
    grunt.registerTask('default', ['sass', 'cssmin', 'uglify', 'imagemin', 'watch']);
};
