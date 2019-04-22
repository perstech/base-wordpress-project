const gulp = require('gulp');
const sass = require('gulp-sass');
const mmq = require('gulp-merge-media-queries');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const sequence = require('run-sequence');
const minify = require('gulp-minify-css');

//Imagens
gulp.task('imagens', function () {
    return gulp
        .src('./src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./wordpress/wp-content/themes/example/assets/img'))
});

//SASS
gulp.task('styles_app', function () {
    return gulp
        .src('./src/scss/main.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        })
            .on('error', sass.logError))
        .pipe(gulp.dest('./src/css/'));
});

gulp.task('styles', ['styles_app'], function () {
    var files = ['./src/css/jquery.fancybox.min.css', './src/css/jquery.scrollbar.css', './src/css/owl.carousel.min.css', './src/css/main.css'];
    return gulp
        .src(files)
        .pipe(autoprefixer({
            browsers: ['last 10 versions', 'ie >= 9']
        }))
        .pipe(minify())
        .pipe(concat('style.css'))
        .pipe(mmq({
            log: true
        }))
        .pipe(gulp.dest('./wordpress/wp-content/themes/example/'));
});

//JS
gulp.task('scripts', function () {
    var files = [
        './node_modules/jquery/dist/jquery.js',
        './node_modules/owl-carousel/owl-carousel/owl.carousel.js',
        './node_modules/sticky-js/dist/sticky.min.js',
        './node_modules/fancybox/dist/js/jquery.fancybox.js',
        './src/js/main.js'
    ];
    return gulp
        .src(files)
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./wordpress/wp-content/themes/example/assets/js/'))
});

//WATCH
gulp.task('watch', ['build'], function () {
    global.isWatching = true;
    gulp.watch('./src/img/**/*', () => {
        sequence('imagens')
});
    gulp.watch(['./src/scss/**/*.scss'], () => {
        sequence('styles')
});
    gulp.watch(['./src/js/**/*.js'], () => {
        sequence('scripts')
});
});

//BUILD
gulp.task('build', function () {
    sequence('imagens', 'styles', 'scripts');
});
