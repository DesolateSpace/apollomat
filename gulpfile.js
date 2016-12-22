var gulp       = require('gulp');
var rename     = require('gulp-rename');
var util       = require('gulp-util');
var postcss    = require('gulp-postcss');
var cssNext    = require('postcss-cssnext');
var scss       = require("postcss-scss");
var atImport   = require("postcss-import")
var math       = require("postcss-math");
var mQoptimize = require("postcss-mq-optimize");
var pxtorem    = require("postcss-pxtorem");
var emMQ       = require("postcss-em-media-query");
var svg        = require("postcss-inline-svg");
var writeSvg   = require("postcss-write-svg");
var cssnano    = require("cssnano");
var csso       = require("postcss-csso");
var assets     = require('postcss-assets');
var product    = require('cartesian-product');
var path       = require('path');
var fs         = require('fs');

var variantsFolder = 'src/variants';

function getFilesFromFolder(folder) {
  return fs.readdirSync(folder);
}

function getVariants() {
  var variantsType = getFilesFromFolder(variantsFolder);
  return product(variantsType.map(function(variantType) {
    var files =  getFilesFromFolder(path.join(variantsFolder, variantType));
    return files.map(function(file) { return path.join(variantsFolder, variantType, file)} );
  }));
}

var postCSSProcessors = [
    atImport({from: './src/index.css'}),
    cssNext,
    assets({ loadPaths: ['./png'] }),
    svg({ path: './svg' }),
    math,
    pxtorem,
    emMQ,
    writeSvg,
    mQoptimize,
    //flexbugs,
    cssnano
    //csso
];

gulp.task('css', function() {
  return gulp.src('./src/index.css')
             .pipe(postcss(postCSSProcessors, { parser: scss }))
             .pipe(rename('apollo_mat.css'))
             .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() { gulp.watch(['src/**/*.css'], ['css']); });
gulp.task('default', ['css']);
