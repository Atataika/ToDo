const gulp = require('gulp'),
    sass = require('gulp-sass'),
    clean = require('gulp-clean'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    htmlmin = require('gulp-htmlmin'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    typescript = require('gulp-typescript'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    ts = typescript.createProject("./tsconfig.json");

const path = {
    src: {
        html: "./src/index.html",
        css: "./src/css",
        sass: "./src/sass/style.sass",
        js: "./src/js/script.js",
        typescript: "./src/typescript/script.ts",
        normalize: "./node_modules/normalize.css/normalize.css",
        favicon: "./src/favicon.ico"
    },
    out: {
        html: "./out",
        css: "./out/css",
        js: "./out/js",
        favicon: "./out",
    }
};

function build_html() {
    return gulp.src(path.src.html)
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest(path.out.html));
}

function dev_sass(dn) {
    gulp.src(path.src.sass)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "compressed",
            errLogToConsole: true
        }))
        .on('error', console.error.bind(console))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.src.css))
        .pipe(browserSync.stream());

    dn();
}

function build_css() {
    return gulp.src(["./node_modules/normalize.css/normalize.css", path.src.css + "/style.min.css"])
        .pipe(concat({
            path: "style.min.css"
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest(path.out.css))
}

function dev_typescript() {
    return gulp.src("./src/typescript/*.ts")
        .pipe(ts())
        .pipe(gulp.dest("./src/js"));
}

function build_javascript() {
    return gulp.src(path.src.js)
        .pipe(gulp.dest(path.out.js));
}

function icon_parse() {
    return gulp.src(path.src.favicon)
        .pipe(gulp.dest(path.out.favicon));
}

function build_clean_before() {
    return gulp.src("./out", {
            read: false,
            allowEmpty: true
        })
        .pipe(clean());
}

function build_clean_after() {
    return gulp.src(["./src/css", "./src/js"], {
            read: false,
            allowEmpty: true
        })
        .pipe(clean());
}

function dev_browserSync() {
    return browserSync.init({
        server: {
            baseDir: './src'
        },
        port: 3000
    });
}

function browserReload(dn) {
    browserSync.reload();

    dn();
}

function dev_watchFiles() {
    gulp.watch("./src/sass/**/*.sass", dev_sass);
    gulp.watch("./src/*.html", browserReload);
    gulp.watch("./src/typescript/*.ts", gulp.series(dev_typescript, browserReload));
}

exports.default = gulp.parallel(dev_sass, dev_typescript);
exports.development = gulp.parallel(dev_sass, dev_typescript, dev_browserSync, dev_watchFiles);
exports.build = gulp.series(build_clean_before, gulp.parallel(build_html, build_css, build_javascript, icon_parse), build_clean_after);