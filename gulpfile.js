
var gulp = require('gulp'),
gutil = require('gulp-util'),
sass = require('gulp-sass'),
coffee = require('gulp-coffee'),
connect = require('gulp-connect'),
uglify = require('gulp-uglify'),
concat = require('gulp-concat');

var coffeeSources = ['scripts/hello.coffee'],
jsSources = ['scripts/*.js'],
sassSources = ['styles/*.scss'],
htmlSources = ['**/*.html'],
outputDir = 'assets';

// task to copy index.html to assets

gulp.task('copy', function() {
    //implementation of the task
    gulp.src('index.html')
    .pipe(gulp.dest('assets'))
});

//log my tasks

gulp.task('log', function(){
    gutil.log('== My Log Task ==')
});

//compile scss 
gulp.task('sass', function() {
    gulp.src('styles/main.scss')
    .pipe(sass({style: 'expanded'}))
      .on('error', gutil.log)
    .pipe(gulp.dest('assets'))
  });

//pipe coffee script to scripts
gulp.task('coffee', function() {
gulp.src('scripts/hello.coffee')
.pipe(coffee({bare: true})
    .on('error', gutil.log))
.pipe(gulp.dest('scripts'))
});

//pipe js to scripts
gulp.task('js', function() {
gulp.src('scripts/*.js')
.pipe(uglify())
.pipe(concat('script.js'))
.pipe(gulp.dest('assets'))
});

gulp.task('default', ['coffee', 'js']);

gulp.task('watch', function() {
    gulp.watch('scripts/hello.coffee', ['coffee']);
    gulp.watch('scripts/*.js', ['js']);
    gulp.watch('styles/main.scss', ['sass']);
  });

  gulp.task('connect', function() {
    connect.server({
      root: '.',
      livereload: true
    })
  });

  gulp.task('html', function() {
    gulp.src(htmlSources)
    .pipe(connect.reload())
  });

  gulp.task('dev', ['html', 'coffee', 'js', 'sass', 'connect', 'watch']);