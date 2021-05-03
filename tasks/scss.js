// Importere gulp modulet fra node_modules
const gulp = require('gulp');
const connect = require('gulp-connect');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

sass.compiler = require('node-sass'); 

function scss(){
    console.log('called scss');
    // ** betyder alle mapper OG undermapper | * betyder alle filer
    return gulp.src("./src/scss/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        // 'dest' står for destination. 'Dist' står for distribrution. 
        .pipe(gulp.dest("./dist/css"))
        .pipe(connect.reload());
}

function buildSCSS(){
    console.log('called scss');
    // ** betyder alle mapper OG undermapper | * betyder alle filer
    return gulp.src("./src/scss/**/*.scss")
        .pipe(sass({outputStyle: "compressed"}))
        // 'dest' står for destination. 'Dist' står for distribrution. 
        .pipe(gulp.dest("./build/css"));
}

function watchSCSS(){
    console.log('called watchSCSS');
    // ** betyder alle mapper OG undermapper | * betyder alle filer
    return gulp.watch('./src/scss/**/*.scss', {ignoreInitial: false}, scss)   
}

module.exports = { watchSCSS, buildSCSS }