'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');

var jsPaths = [
    "bower_components/jquery/dist/jquery.js",
    "bower_components/bootstrap/dist/js/bootstrap.js",
    "src/js/app.js",
];

gulp.task('sass', function () {
  gulp.src('src/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('../build/css/'))
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('build/css'))
    .pipe(livereload());
});

gulp.task('scripts', function() {
    return gulp.src(jsPaths)
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/js'));
});

// gulp.task('sass:watch', function () {
//   gulp.watch('src/sass/**/*.scss', ['sass']);
// });

gulp.task('default', function() {
  gulp.watch('src/sass/**/*.scss', ['sass']);
});