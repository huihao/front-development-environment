var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var del = require('del');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
 
 var paths = {
  sass: ['source/sass/**/*'],
  images: 'source/img/**/*'
};


gulp.task('clean', function(cb) {

  del(['build'], cb);
});

gulp.task('sass', ['clean'] ,function() {
    return sass('source/sass') 
    .on('error', function (err) {
      console.error('Error!', err.message);
   })
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(gulp.dest('result/css'));
});

gulp.task('images', ['clean'], function() {
  return gulp.src(paths.images)
    .pipe(imagemin({optimizationLevel: 5}))
    .on('error', function (err) {
      console.error('Error!', err.message);
   })
    .pipe(gulp.dest('result/img'));
});

gulp.task('browserify', function() {
    return browserify('./source/js/app.js')
        .bundle()

        .on('error', function (err) {
      		console.error('Error!', err.message);
   		})
        
        .pipe(source('bundle.js'))

        .on('error', function (err) {
      		console.error('Error!', err.message);
   		})
        
        .pipe(gulp.dest('./result/js'));
});


gulp.task('default', ['images','sass','browserify']);