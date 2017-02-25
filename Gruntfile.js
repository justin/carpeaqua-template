'use strict';
module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        watch: {
            sass: {
                files: ['assets/css/**/*.{scss,sass}'],
                tasks: ['sass', 'cssmin']
            },
            js: {
                files: '<%= jshint.all %>',
                tasks: ['jshint', 'uglify']
            },
            images: {
                files: ['assets/images/**/*.{png,jpg,gif}'],
                tasks: ['imagemin']
            }
        },

        // sass
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                },
                files: {
                    'assets/css/build/main.css': 'assets/css/main.scss'
                }
            }
        },

        // css minify
        cssmin: {
            options: {
                keepSpecialComments: 1
            },
            minify: {
                expand: true,
                cwd: 'assets/css/build',
                src: ['*.css', '!*.min.css'],
                ext: '.css'
            }
        },

        // javascript linting with jshint
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                "force": true
            },
            all: [
                'Gruntfile.js',
                'assets/js/source/**/*.js'
            ]
        },

        // uglify to concat, minify, and make source maps
        uglify: {
            plugins: {
                files: {
                    'assets/js/plugins.min.js': [
                        'assets/js/vendor/jquery/dist/jquery.js',
                        'assets/js/vendor/bigfoot/dist/bigfoot.js',
                        'assets/js/vendor/highlight/src/highlight.js',
                    ]
                }
            },
            main: {
                files: {
                    'assets/js/main.min.js': [
                        'assets/js/source/main.js'
                    ]
                }
            }
        },

        // image optimization
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 7,
                    progressive: true,
                    interlaced: true
                },
                files: [{
                    expand: true,
                    cwd: 'assets/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'assets/images/'
                }]
            }
        },

        // deploy via rsync
        deploy: {
            options: {
                src: "./",
                args: ["--verbose"],
                exclude: ['.git*', 'node_modules', '.sass-cache', 'Gruntfile.js', 'package.json', '.DS_Store', 'README.md', 'config.rb', '.jshintrc'],
                recursive: true,
                syncDestIgnoreExcl: true
            },
            staging: {
                 options: {
                    dest: "~/Development/carpeaqua-wordpress/wp-content/themes/carpeaqua-2016/"
                }
            },
            production: {
                options: {
                    dest: "~/www/html/wp-content/themes/carpeaqua-2016",
                    host: "justinwme@104.236.158.40"
                }
            }
        }

    });

    // rename tasks
    grunt.renameTask('rsync', 'deploy');

    // register task
    grunt.registerTask('default', ['sass', 'cssmin', 'uglify', 'imagemin', 'watch']);

};
