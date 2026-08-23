'use strict';

const { src, dest, series, parallel, watch } = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const uglify = require('gulp-uglify');
// gulp-zip v6 is ESM; under require() it resolves to the module namespace.
const zip = require('gulp-zip').default;

// postcss plugins
const tailwindcss = require('@tailwindcss/postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const nestedCSS = require('postcss-nested');

function css() {
  return src('assets/css/*.css', { sourcemaps: true })
    .pipe(postcss([
      tailwindcss(),
      autoprefixer(),
      nestedCSS(),
      cssnano()
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

// encoding: false is required. gulp 5's src() decodes files as UTF-8 unless told
// otherwise, which rewrites every byte outside the ASCII range to U+FFFD and
// silently destroys PNGs and JPEGs on the way through.
function images() {
  return src('./assets/images/**/*', { encoding: false })
    .pipe(dest("./assets/built/"))
}

function bundle() {
  var themeName = require('./package.json').name;
  var filename = themeName + '.zip';

  // Everything Ghost needs to render the theme, and nothing else. Dotfiles
  // (.devcontainer/, .vscode/, .github/, etc.) are already excluded by
  // dot: false below; repo-local tooling and dev artifacts are excluded
  // explicitly. scripts/ is empty today but stays in the list so anything
  // added there later doesn't ship to production by accident.
  return src([
    '**',
    '!Brewfile*',
    '!Gulpfile*',
    '!node_modules', '!node_modules/**',
    '!production', '!production/**',
    '!scripts', '!scripts/**',
    '!docs', '!docs/**',
    '!server', '!server/**',
    '!AGENTS.md',
    '!package-lock.json',
    '!screenshot.png',
    // Only assets/built/ is ever loaded via {{asset}}; assets/css/ and
    // assets/images/ are build inputs, and the CSS sourcemap is dev-only.
    '!assets/css', '!assets/css/**',
    '!assets/images', '!assets/images/**',
    '!assets/built/*.map'
  ], { dot: false, encoding: false })
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
exports.build = build
exports.production = production
