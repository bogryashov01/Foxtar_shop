var gulp = require('gulp'),
    scss = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglifyjs = require('gulp-uglifyjs'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('scss', async function(){
    return gulp.src('app/scss/**/*.scss')
            .pipe(sourcemaps.init())
            .pipe(scss({
                outputStyle: 'expanded'
            }))
            .pipe(autoprefixer({
                browsers: ['last 8 versions'],
            }))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('app/css'))
            .pipe(browserSync.reload({stream: true}))
});

gulp.task('script', async function(){
    return gulp.src('app/js/**/*.js')
            .pipe(browserSync.reload({stream: true}))
});

gulp.task('code', async function(){
    return gulp.src('app/*.html')
            .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', async function(){
    browserSync.init({
        server : {
            baseDir: "app"
        }
    })
});

gulp.task('js', async function(){
    return gulp.src('app/libs/**/*js')
        .pipe(concat('libs.min.js'))
        .pipe(uglifyjs())
        .pipe(gulp.dest('app/js'))
});

gulp.task('watch', async function(){
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'))
    gulp.watch('app/js/**/*.js', gulp.parallel('script'))
    gulp.watch('app/*.html', gulp.parallel('code'))
});

gulp.task('default', gulp.parallel('scss', 'js', 'browser-sync', 'watch'));