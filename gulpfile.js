'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var handlebars = require('gulp-compile-handlebars');
var layouts = require('handlebars-layouts');
//
handlebars.Handlebars.registerHelper(layouts(handlebars.Handlebars));

var jsPaths = [
    "bower_components/jquery/dist/jquery.js",
    "bower_components/bootstrap/dist/js/bootstrap.js",
    "src/js/app.js",
];

var handlebarsConfig = {
    index: {
        templateData: {
            dummyData: require('./static_data.json')
        },
        options: {
            ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false
            batch : [
                './src/handlebars/',
                './src/handlebars/components/'
            ],
            helpers : {
                capitals : function(str){
                    return str.toUpperCase();
                }
            }
        }
    }
};

gulp.task('sass', function () {
  gulp.src('src/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/css'))
    //.pipe(livereload({ start: true }))
});

gulp.task('scripts', function() {
    return gulp.src(jsPaths)
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/js'));
});

gulp.task('handlebars', function() {
    return gulp.src('src/handlebars/views/*.handlebars')
        .pipe(handlebars(handlebarsConfig.index.templateData, handlebarsConfig.index.options))
        .pipe(rename(function (path) {
            // path.dirname += '/' + path.basename;
            path.extname = '.html';
        }))
        .pipe(gulp.dest('./build'));
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/handlebars/**/*.handlebars', ['handlebars']);
});

gulp.task('default', ['sass', 'scripts', 'handlebars']);
