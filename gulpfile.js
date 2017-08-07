const gulp = require('gulp');
const babel = require('gulp-babel');
const connect = require('gulp-connect');
const plumber = require('gulp-plumber');
const pug = require('gulp-pug');
const stylus = require('gulp-stylus');

gulp.task('stylus', () => {
  return gulp.src('src/styles/*.styl')
    .pipe(plumber())
    .pipe(stylus())
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload())
});

gulp.task('pug', () => {
  return gulp.src('src/index.pug')
    .pipe(plumber())
    .pipe(pug())
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload())
});

gulp.task('babel', () => {
  return gulp.src('src/scripts/*.js')
    .pipe(plumber())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload())
});

gulp.task('default', ['pug', 'stylus', 'babel'], () => {

  connect.server({
      root: 'dist',
      livereload: true
  });

  gulp.watch(['src', 'src/**/*.pug'], ['pug']);
  gulp.watch(['src/styles', 'src/styles/**/*.styl'], ['stylus']);
  gulp.watch(['src/scripts', 'src/scripts/**/*.js'], ['babel']);

})