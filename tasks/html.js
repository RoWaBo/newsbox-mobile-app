// Importere gulp modulet fra node_modules
const gulp = require('gulp');
const connect = require('gulp-connect');
const rename = require('gulp-rename');

function html(){
    console.log('called html');
    // * tager fat i alle filer i html
    // *.html tager fat i alle filer der ender med .html
    return gulp.src("./src/html/*.html")
        .pipe(rename(path => {
            if (path.basename !== "index"){
                // opret en mappe som har samme navn som html-filen
                path.dirname = path.basename
                // ændrer html-filens navn til index
                path.basename = "index"
            }    
        }))
        // alle html filer bliver kopieret og lagt i 'dist mappe'
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
}
function buildHTML(){
    console.log('called buildHTML');
    // * tager fat i alle filer i html
    // *.html tager fat i alle filer der ender med .html
    return gulp.src("./src/html/*.html")
        .pipe(rename(path => {
            if (path.basename !== "index"){
                // opret en mappe som har samme navn som html-filen
                path.dirname = path.basename
                // ændrer html-filens navn til index
                path.basename = "index"
            }    
        }))
        // alle html filer bliver kopieret og lagt i 'dist mappe'
        .pipe(gulp.dest('./build'));
}

function watchHTML(){
    console.log('called watchHTML');
    // watch tager 3 argumenter("mappesti", {object}, function() som skal køres, når der ses en ændring)
    return gulp.watch('./src/html/*.html', {ignoreInitial: false}, html)
}

module.exports = { watchHTML, buildHTML };