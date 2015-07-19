var gulp = require('gulp'),
  concat = require('gulp-concat'),
  babel = require('gulp-babel'),
  sourcemaps = require('gulp-sourcemaps'),
  sass = require('gulp-sass');

var paths = {
  api: ['./service/src/**/*.js'],
  client: ['./client/src/**/*.js']
};

gulp.task('default', ['scripts-service', 'scripts-client', 'sass', 'watch']);

gulp.task('scripts-service', function () {
  return gulp.src(paths.api)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(gulp.dest('./service/build'));
});

gulp.task('scripts-client', function () {
  return gulp.src(paths.client)
    .pipe(sourcemaps.init())
    .pipe(babel({
      modules: 'amd',
      moduleIds: true
    }))
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./client/build'));
});

gulp.task('sass', function () {
  gulp.src('./client/scss/main.scss')
    .pipe(sass({
      errLogToConsole: true
    })).pipe(gulp.dest('./client/build/css/'));
});


gulp.task('watch', function() {
  gulp.watch('./client/scss/main.scss', ['sass']);
  gulp.watch(paths.api, ['scripts-service']);
  gulp.watch(paths.client, ['scripts-client']);
});

