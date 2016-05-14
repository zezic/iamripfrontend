// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var pug = require('gulp-pug');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');
var addsrc = require('gulp-add-src'); 

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('src/sass/*.sass')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css'));
});

// Compile Our Jade
gulp.task('pug', function() {
    return gulp.src('src/pug/*.jade')
        .pipe(pug({
          pretty: true,
          basedir: 'src/pug'
        }))
        .pipe(gulp.dest('./'));
});

// Concat JS
gulp.task('scripts', function() {
    return gulp.src('js/vendor/*.js')
        .pipe(uglify())
        .pipe(addsrc('js/*.js'))
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('js/prod/'));
});
// Concat vendor JS
//gulp.task('scripts-vendor', function() {
    //return gulp.src('js/vendor/*.js')
        //.pipe(concat('vendor-bundle.js'))
        //.pipe(uglify())
        //.pipe(gulp.dest('js/prod/'));
//});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch('js/vendor/*.js', ['scripts']);
    //gulp.watch('js/vendor/*.js', ['scripts-vendor']);
    gulp.watch('src/sass/*.sass', ['sass']);
    gulp.watch('src/sass/includes/*.sass', ['sass']);
    gulp.watch('src/pug/*.jade', ['pug']);
    gulp.watch('src/pug/includes/*.jade', ['pug']);
});

// Default Task
gulp.task('default', ['sass', 'pug', 'scripts', 'watch']);
// gulp.task('default', ['sass', 'watch']);
