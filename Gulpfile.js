'use strict';

const { src, dest, series, parallel, watch } = require('gulp');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const del = require('del');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const sass = require("gulp-sass");
sass.compiler = require('node-sass');
const uglify = require('gulp-uglify');
const zip = require('gulp-zip');

function css() {
  var sassOptions = {
    outputStyle: "expanded",
    sourcemap: 'none'
  }

  return src('assets/css/**/*.scss')
    .pipe(sass(sassOptions))
    .pipe(dest("assets/built/"))
    .pipe(cleanCSS())
    .pipe(dest("assets/built/"))
    .pipe(src('node_modules/prismjs/themes/prism-tomorrow.css'))
    .pipe(dest("assets/built/"))
}

function javascript() {
  return src([
    'node_modules/prismjs/prism.js',
    'node_modules/prismjs/components/prism-swift.js',
    'node_modules/prismjs/components/prism-bash.js',
    'node_modules/prismjs/components/prism-json.js',
    ])
    .pipe(concat('prism.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest("./assets/built/"));
}

function images() {
  var options = {
    optimizationLevel: 7,
    progressive: true,
    interlaced: true
  }

  return src('./assets/images/**/*')
    .pipe(imagemin(options))
    .pipe(dest("./assets/built/"))
}

function bundle() {
  var themeName = require('./package.json').name;
  var filename = themeName + '.zip';

  return src([
      '**',
      '!Brewfile*',
      '!Gulpfile*',
      '!node_modules', '!node_modules/**',
      '!production¸', '!production/**',
      '!script', '!script/**',
      '!server', '!server/**'
    ])
    .pipe(zip(filename))
    .pipe(dest('./production/'))
}

const watchCSS = () => watch('assets/css/**', css);
const watchImages = () => watch('assets/images/**', images);
const watcher = parallel(watchCSS, watchImages);

const build = series(css, javascript, images)
const dev = series(build, watcher)
const production = series(build, bundle)

exports.default = dev
exports.production = production
