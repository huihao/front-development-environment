var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var del = require('del');
 
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

gulp.task('sass', ['clean'] ,function() {
    return sass(paths.source.styles) 
    .on('error', function (err) {
      console.error('Error!', err.message);
   })
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(gulp.dest(paths.build.styles));
});

gulp.task('images', ['clean'], function() {
  return gulp.src(paths.source.images)
    .pipe(imagemin({optimizationLevel: 5}))
    .on('error', function (err) {
      console.error('Error!', err.message);
   })
    .pipe(gulp.dest(paths.build.images));
});



gulp.task('default', ['images','sass']);