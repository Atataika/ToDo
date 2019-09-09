const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

function css_style(done) {
    gulp.src('./styles/sass/style.sass')
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'compressed'
        }))
        .on('error', console.error.bind(console))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./styles/css/'))
        .pipe(browserSync.stream());

    done();
}

function sync(done) {
    browserSync.init({
        server: {
            baseDir: './'
        },
        port: 3000
    });

    done();
}

function browserReload(done) {
    browserSync.reload();

    done();
}

function watchSass() {
    gulp.watch("./styles/sass/style.sass", css_style);
}

function watchFiles() {
    gulp.watch("./styles/sass/style.sass", css_style);
    gulp.watch("./**/*.html", browserReload);
    gulp.watch("./**/*.js", browserReload);
}

exports.default = watchSass;
exports.startServer = gulp.parallel(watchFiles, sync);