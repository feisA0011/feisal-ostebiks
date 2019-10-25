const gulp = require('gulp'); // remember to install gulp in the terminal
const ejs = require('gulp-ejs'); // remember to install gulp-ejs in the terminal
const rename = require('gulp-rename'); // remember to install gulp-rename in the terminal
const connect = require('gulp-connect'); // remember to install gulp-connect in the terminal
const sass = require('gulp-sass'); // remember to install gulp-sass in the terminal
sass.compiler = require('node-sass'); // remember to install node-sass in the terminal
const babel = require('gulp-babel') // Remember babel/core and preset
const imagemin = require('gulp-imagemin');

function html(done) {
    gulp.src("./src/html/templates/*.ejs")
        .pipe(ejs())
        .pipe(rename(function (path) {
            if (path.basename != "index") {
                path.dirname = path.basename;
                path.basename = 'index';

            }
            path.extname = ".html"

        }))
        .pipe(gulp.dest("./dist"))
        .pipe(connect.reload());

    done()
}

function watchHtml() {
    gulp.watch("./src/html/**/*.ejs", {
        ignoreInitial: false
    }, html)
}


function scss(done) {
    gulp.src("./src/css/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./dist/assets/css"))
        .pipe(connect.reload())
    done()
}

function watchScss() {
    gulp.watch("./src/css/**/*.scss", {
        ignoreInitial: false
    }, scss)
}

function babelJs(done) {
    gulp.src('./src/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest("./dist/assets/javascript"))

        .pipe(connect.reload())
    done()
}

function watchJavascript() {
    gulp.watch('./src/js/**/*.js', {
        ignoreInitial: false
    }, babelJs)
}

function json(done) {
    gulp.src('./src/json/*.json')
        .pipe(gulp.dest('./dist/data'))
        .pipe(connect.reload());
    done()
}

function watchJson() {
    gulp.watch('./src/json/*.json', {
        ignoreInitial: false
    }, json)
}

function images(done) {
    gulp.src("./src/images/*")
        .pipe(imagemin())
        .pipe(gulp.dest("./dist/assets/images"))
        .pipe(connect.reload());
    done();
}

function watchImages() {
    gulp.watch('./src/images/*', {
            ignoreInitial: false
        },
        images)
}


gulp.task('dev', function (done) {
    watchHtml()
    watchScss()
    watchJavascript()
    watchJson()
    watchImages()
    connect.server({
        livereload: true,
        root: "dist"
    })
    done()
})

gulp.task("build", function (done) {
    html();
    scss();
    javascript();
    json();
    images();
    done();
})