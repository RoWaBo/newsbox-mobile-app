// Importere gulp modulet fra node_modules
const gulp = require('gulp');
const connect = require('gulp-connect');
// Importere navngivet exports fra html.js 
const { watchHTML, buildHTML } = require('./tasks/html');
const { watchSCSS, buildSCSS } = require('./tasks/scss');
const { watchJS, buildJS } = require('./tasks/js');
const { watchImage, buildImage } = require('./tasks/image');


function dist(done) {
    // alle gulp tasks skrives her

    watchHTML()
    watchSCSS()
    watchJS()
    watchImage()

    connect.server({
        root: "./dist",
        livereload: true,
        port: 3000
    })
    done()
}

function build (done){
    buildHTML()
    buildImage()
    buildSCSS()
    buildJS()
    done()    
}

// DEFAULT EXPORT - export skrives anderledes end normalt fordi node er en anden version af js
exports.default = dist;
// NAMED EXPORT
exports.build = build;