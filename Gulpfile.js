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

function clean() {
  return del(["./build/"]);
}

function css() {
  var sassOptions = {
    outputStyle: "expanded",
    sourcemap: 'none'
  }

  return src('./assets/css/**/*.scss')
    .pipe(sass(sassOptions))
    .pipe(dest("./build/assets/css/"))
    .pipe(cleanCSS())
    .pipe(dest("./build/assets/css/"))
    .pipe(src('./node_modules/prismjs/themes/prism-tomorrow.css'))
    .pipe(dest("./build/assets/css/"))
}

function javascript() {
  return src([
    './node_modules/prismjs/prism.js',
    './node_modules/prismjs/components/prism-swift.js',
    './node_modules/prismjs/components/prism-bash.js',
    './node_modules/prismjs/components/prism-json.js',
    ])
    .pipe(concat('prism.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest("./build/assets/js/"));
}

function images() {
  var options = {
    optimizationLevel: 7,
    progressive: true,
    interlaced: true
  }

  return src('./assets/images/**/*')
    .pipe(imagemin(options))
    .pipe(dest("./build/assets/images/"))
}

function fonts() {
  return src('assets/fonts/**/*')
    .pipe(dest('./build/assets/fonts/'))
}

function templates() {
  return src(['*.hbs', 'partials/**'], {base: '.'})
    .pipe(dest('./build/'))
}

function bundle() {
  var themeName = require('./package.json').name;
  var filename = themeName + '.zip';

  return src([
      'package.json',
      'LICENSE',
      'screenshot.png'
    ])
    .pipe(dest('./build/'))
    .pipe(src('./build/'))
    .pipe(zip(filename))
    .pipe(dest('./production/'))
}

const watchCSS = () => watch('./assets/css/**', css);
const watchImages = () => watch('./assets/images/**', images);
const watchHBS = () => watch(['*.hbs', 'partials/**'], templates);
const watcher = parallel(watchCSS, watchImages, watchHBS);

const build = series(css, javascript, images, fonts, templates)
const dev = series(clean, build, watcher)
const production = series(build, bundle)

exports.default = dev
exports.production = production
