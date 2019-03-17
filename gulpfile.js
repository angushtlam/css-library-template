const del = require('del')
const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const minifycss = require('gulp-minify-css')
const rename = require('gulp-rename')
const sass = require('gulp-sass')

const BUILD_DIR = 'build'

async function clean() {
  del([BUILD_DIR])
}

async function build() {
  return Promise.resolve(
    gulp
      .src('scss/index.scss')
      .pipe(sass({includePaths: 'node_modules/', style: 'expanded'}))
      .pipe(autoprefixer('last 3 version', 'safari 5', 'ie 8', 'ie 9'))
      .pipe(gulp.dest(`${BUILD_DIR}/css`)) // Build the CSS files
      .pipe(rename({suffix: '.min'})) // Rename and minify CSS files
      .pipe(minifycss())
      .pipe(gulp.dest(`${BUILD_DIR}/css`))
  )
}

async function watch() {
  gulp.watch(['scss/*.scss'], build)
}

exports.default = build
exports.build = build
exports.clean = clean
exports.watch = watch
