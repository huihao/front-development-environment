var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var del = require('del');
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');

var paths = {
            root: './',
            build: {
                root: 'build/',
                styles: 'build/css/',
                scripts: 'build/js/',
                images:'build/img/'
            },
            dist: {
                root: 'dist/',
                styles: 'dist/css/',
                scripts: 'dist/js/',
                images:'dist/img/'
            },
            source: {
                root: 'src/',
                styles: 'src/sass/',
                scripts: 'src/js/*.js',
                images:'src/img/**/*'
            },
        }

gulp.task('clean', function(cb) {

  del(['build'], cb);
});

gulp.task('connect', function () {
    connect.server({
        root: '',
        port:'5050',
        livereload: true
    });
});

gulp.task('sass', ['clean'] ,function() {
    return sass(paths.source.styles) 
    .on('error', function (err) {
      console.error('Error!', err.message);
   })
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(gulp.dest(paths.build.styles))
    .pipe(connect.reload());
});

gulp.task('script', function () {
    return gulp.src(paths.source.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(gulp.dest(paths.build.scripts))
        .pipe(connect.reload());
});

gulp.task('images', ['clean'], function() {
  return gulp.src(paths.source.images)
    .pipe(imagemin({optimizationLevel: 5}))
    .on('error', function (err) {
      console.error('Error!', err.message);
   })
    .pipe(gulp.dest(paths.build.images))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch("src/sass/**/*", ['sass']);
    gulp.watch(paths.source.images, ['images']);
    gulp.watch(paths.source.scripts, ['script']);
    gulp.watch('build/*.html', ['html']);
});


gulp.task('default', ['connect', 'images', 'sass', 'watch', "script"]);