var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('scripts', function () {
    gulp.src(['./Client/**/*.js', '!./Client/**/*.test.js', '!./Client/app.min.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('./app.min.js'))
       // .pipe(uglify({ mangle: true }))
        .pipe(gulp.dest('Client'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('Client'));
});

gulp.task('watch', function () {
    watch(['./Client/**/*.js', '!./Client/**/*.test.js', '!./Client/app.min.js'], function () {
        gulp.start('scripts');
    });
});

gulp.task('default', ['scripts', 'watch']);