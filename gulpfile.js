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
var browserSync = require('browser-sync');

handlebars.Handlebars.registerHelper(layouts(handlebars.Handlebars));

var jsPaths = [
    "bower_components/jquery/dist/jquery.js",
    "bower_components/bootstrap/dist/js/bootstrap.js",
    "src/js/app.js",
];

var handlebarsConfig = {
    index: {
        templateData: {
            aboutData: require('./static_data.json')
        },
        options: {
            ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false
            batch : [
                './src/templates/',
                './src/templates/components/'
            ],
            helpers : {
                capitals : function(str){
                    return str.toUpperCase();
                }
            }
        }
    }
};

// Compile SCSS
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
});

// Compile JS
gulp.task('scripts', function() {
    return gulp.src(jsPaths)
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/js'));
});

// Compile layouts, pages, and partials into flat HTML files
gulp.task('handlebars', function() {
    return gulp.src('src/templates/views/*.handlebars')
        .pipe(handlebars(handlebarsConfig.index.templateData, handlebarsConfig.index.options))
        .pipe(rename(function (path) {
            // path.dirname += '/' + path.basename;
            path.extname = '.html';
        }))
        .pipe(gulp.dest('./build'));
});

// Start a server with LiveReload to preview the site in
gulp.task('server', function(){
    browserSync.init({
        server: {
            baseDir: "build"
        }
    });
});

// Watch for file changes
gulp.task('watch', function() {
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/templates/**/*.handlebars', ['handlebars']);
  gulp.watch('src/templates/**/*.handlebars').on('change', browserSync.reload);
});

// Build the "build" folder by running all of the above tasks
gulp.task('build', ['sass', 'scripts', 'handlebars']);

// Run builds, run the server, and watch for file changes
gulp.task('default', ['build']);

gulp.task('serve', ['sass'], function(){
    browserSync.init({
        server: "./build"
    });
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('src/templates/**/*.handlebars', ['handlebars']);
    gulp.watch('src/templates/**/*.handlebars').on('change', browserSync.reload);
})
