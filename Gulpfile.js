'use strict';

const { src, dest, series, parallel, watch } = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const uglify = require('gulp-uglify');
const zip = require('gulp-zip');

// postcss plugins
const cssnano = require('cssnano');
const nestedCSS = require('postcss-nested');

function css() {
  return src('assets/css/*.css', { sourcemaps: true })
    .pipe(postcss([
      cssnano(),
      nestedCSS()
    ]))
    .pipe(dest("assets/built/", { sourcemaps: '.' }))
    .pipe(src('node_modules/prismjs/themes/prism-tomorrow.css', { sourcemaps: '.' }))
    .pipe(dest("assets/built/", { sourcemaps: '.' }))
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
    .pipe(dest("./assets/built/"), { sourcemaps: '.' });
}

function images() {
  return src('./assets/images/**/*')
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
