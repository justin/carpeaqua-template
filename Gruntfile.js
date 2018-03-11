'use strict';

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    var options = {
        // tasks paths
        config : {
            src: "grunt/*.*"
        },
        pkg : grunt.file.readJSON('package.json'),
        // Global variables
        dirs : {
            source: 'assets',
            staging: 'server/content/themes/carpeaqua',
            release: 'dist'
        }
    };

    // Load our tasks from the `config.src` dir.
    var configs = require( 'load-grunt-configs' )( grunt, options);
    grunt.initConfig(configs);

    grunt.renameTask('rsync', 'deploy');
    grunt.registerTask('default', ['sass', 'cssmin', 'uglify', 'imagemin', 'watch']);
};
