'use strict';

module.exports = {
  staging: {
    files: [
        { expand: true, src: ['package.json', '*.hbs', 'screenshot.png'], dest: '<%= dirs.staging %>', filter: 'isFile', flatten: true },
        { expand: true, src: ['partials/*'], expand: true, dest: '<%= dirs.staging %>' },
        { cwd: '<%= dirs.source %>', expand: true, src: ['js/build/*'], dest: '<%= dirs.staging %>/assets/js/', filter: 'isFile', flatten: true },
        { cwd: '<%= dirs.source %>/fonts/', expand: true, src: ['*/**'], dest: '<%= dirs.staging %>/assets/fonts/' },
        { cwd: '<%= dirs.source %>', expand: true, src: ['images/**'], dest: '<%= dirs.staging %>/assets/images/', filter: 'isFile', flatten: true },
        { cwd: '<%= dirs.source %>', expand: true, src: ['css/**/*.css*'], dest: '<%= dirs.staging %>/assets/css/', filter: 'isFile', flatten: true }
    ]
  },
  production: {
    files: [
        { expand: true, src: ['package.json', '*.hbs', 'screenshot.png'], dest: '<%= dirs.production %>', filter: 'isFile', flatten: true },
        { expand: true, src: ['partials/'], dest: '<%= dirs.production %>/partials/', filter: 'isFile', flatten: true },
        { cwd: '<%= dirs.source %>', expand: true, src: ['js/build/*'], dest: '<%= dirs.production %>/assets/js/', filter: 'isFile', flatten: true },
        { cwd: '<%= dirs.source %>/fonts/', expand: true, src: ['*/**'], dest: '<%= dirs.production %>/assets/fonts/' },
        { cwd: '<%= dirs.source %>', expand: true, src: ['images/**'], dest: '<%= dirs.production %>/assets/images/', filter: 'isFile', flatten: true },
        { cwd: '<%= dirs.source %>', expand: true, src: ['css/**/*.css*'], dest: '<%= dirs.production %>/assets/css/', filter: 'isFile', flatten: true }
    ]
  }
};
