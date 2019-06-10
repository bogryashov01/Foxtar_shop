var gulp = require('gulp'),
    scss = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglifyjs = require('gulp-uglifyjs'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    tinypng = require('gulp-tinypng-compress'),
    spritesmith = require('gulp.spritesmith'),
    spritesmash = require('gulp-spritesmash');

gulp.task('scss', async function(){
    return gulp.src('app/scss/**/*.scss')
            .pipe(sourcemaps.init())
            .pipe(scss({
                outputStyle: 'compressed'
            }))
            .pipe(autoprefixer({
                browsers: ['last 8 versions'],
            }))
            .pipe(sourcemaps.write())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('app/css'))
            .pipe(browserSync.reload({stream: true}))
});

gulp.task('libs-styles', async function(){
    return gulp.src(['app/libs/**/*.scss', 'app/libs/**/*.css'])
            .pipe(scss())
            .pipe(concatCss("libs.min.css"))
            .pipe(cleanCSS())
            .pipe(gulp.dest('app/css/'))
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

gulp.task('sprite', async function() {
    return gulp.src('app/img/sprite/*.png')
    .pipe(spritesmith({
      imgName: 'sprite.png',
      cssName: 'sprite.css',
    }))
    .pipe(spritesmash())
    .pipe(gulp.dest('app/sprite/'));
})

gulp.task('watch', async function(){
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'))
    gulp.watch('app/libs/**/*.scss', gulp.parallel('libs-styles'))
    gulp.watch('app/libs/**/*.js', gulp.parallel('js'))
    gulp.watch('app/js/**/*.js', gulp.parallel('script'))
    gulp.watch('app/*.html', gulp.parallel('code'))
});

gulp.task('default', gulp.parallel('sprite', 'scss', 'libs-styles', 'js', 'browser-sync', 'watch'));



// BUILD

// gulp.task('fonts', function () {
// return gulp.src('app/fonts/*')
//     .pipe(gulp.dest('srs/fonts/'))
// });

// gulp.task('tinypng', async function () {
// 	gulp.src('app/img/*.{png,jpg,jpeg}')
// 		.pipe(tinypng({
// 			key: 'eGwHsgRHgRYLa2syNI121TJRmNwb7J46',
// 			sigFile: 'app/img/.tinypng-sigs',
// 			log: true
// 		}))
// 		.pipe(gulp.dest('app/img/'));
// });