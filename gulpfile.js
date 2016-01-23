var gulp = require('gulp');
var concat = require('gulp-concat');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var gulpif = require('gulp-if');

var useUglify = true;

gulp.task('clean', function () {
    return gulp.src(['./dist/*'], {read: false})
        .pipe(clean());
});

gulp.task('libsrc', ['clean'], function () {
    return gulp.src(['./src/lib/service.js'])
        .pipe(browserify({
            standalone: 'WebPhone'
        }))
        .pipe(rename('rc-web-phone.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('jssipconcat', ['libsrc'], function () {
    return gulp.src(['./src/lib/sip.js', './dist/rc-web-phone.js'])
        .pipe(concat('rc-web-phone.js'))
      //  .pipe(gulpif(useUglify, uglify()))
        .pipe(gulp.dest('./dist/'));
});


gulp.task('build', ['jssipconcat']);

gulp.task('watch_lib', function () {
    useUglify = false;
    gulp.watch('lib/*.js', ['build']);
});

gulp.task('default', ['build']);