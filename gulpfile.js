"use strict";

//******************************************************************************
//* DEPENDENCIES
//******************************************************************************
var gulp        = require("gulp"),
    browserify  = require("browserify"),
    source      = require("vinyl-source-stream"),
    buffer      = require("vinyl-buffer"),
    tslint      = require("gulp-tslint"),
    tsc         = require("gulp-typescript"),
    sourcemaps  = require("gulp-sourcemaps"),
    uglify      = require("gulp-uglify"),
    runSequence = require("run-sequence"),
    mocha       = require("gulp-mocha"),
    istanbul    = require("gulp-istanbul"),
    browserSync = require('browser-sync').create();
    
//******************************************************************************
//* LINT
//******************************************************************************
gulp.task("lint", function() {
    return gulp.src([
        "source/**/**.ts",
        "test/**/**.test.ts"
    ])
    .pipe(tslint({ }))
    .pipe(tslint.report("verbose"));
});

//******************************************************************************
//* BUILD
//******************************************************************************
var tsProject = tsc.createProject("tsconfig.json");

gulp.task("build-app", function() {
    return gulp.src([
            "source/**/**.ts",
            "typings/index.d.ts/",
            "source/interfaces/interfaces.d.ts"
        ])
        .pipe(tsc(tsProject))
        .js.pipe(gulp.dest("source/"));
});

var tsTestProject = tsc.createProject("tsconfig.json");

gulp.task("build-test", function() {
    return gulp.src([
            "test/**/*.ts",
            "typings/index.d.ts/",
            "source/interfaces/interfaces.d.ts"
        ])
        .pipe(tsc(tsTestProject))
        .js.pipe(gulp.dest("test/"));
});

gulp.task("build", function(cb) {
    runSequence(["build-app", "build-test"], cb);
});

//******************************************************************************
//* TEST
//******************************************************************************
gulp.task("istanbul:hook", function() {
    return gulp.src(['source/**/*.js'])
        // Covering files
        .pipe(istanbul())
        // Force `require` to return covered files
        .pipe(istanbul.hookRequire());
});

gulp.task("test", ["istanbul:hook"], function() {
    return gulp.src('test/**/*.test.js')
        .pipe(mocha({ui: 'bdd'}))
        .pipe(istanbul.writeReports());
});

//******************************************************************************
//* realease
//******************************************************************************
var appPublishPathName="release";
var appSourcePathName="Booking";

var libraryName1 = "internationalfilght";
var outputFileName1 = libraryName1 + ".min.js";
var mainTsFilePath1 = "source/"+appSourcePathName+"/"+libraryName1+".js";

var libraryName2="domesticfilght";
var outputFileName2 = libraryName2 + ".min.js";
var mainTsFilePath2 = "source/"+appSourcePathName+"/"+libraryName2+".js";

var libraryName3="shiftrptofmajordomo";
var outputFileName3 = libraryName3 + ".min.js";
var mainTsFilePath3 = "source/"+appSourcePathName+"/"+libraryName3+".js";

var outputFolder   = appPublishPathName+"/"+appSourcePathName+"/dist/";
var outputRootFolder   = appPublishPathName+"/"+appSourcePathName+"/";
var outputComponentFolder   = appPublishPathName+"/"+appSourcePathName+"/dist/Component/";
var outputComponentswfuploadFolder   = appPublishPathName+"/"+appSourcePathName+"/dist/Component/swfupload/";
var outputComponentFolderjs  = appPublishPathName+"/"+appSourcePathName+"/dist/shiftjs/";
gulp.task("bundle", function() {
   
   
   var bundler = browserify({
        debug: true,
        standalone : libraryName3
    });
  
    gulp.src("source/"+appSourcePathName+'/approot/*.html')
        .pipe(gulp.dest(outputRootFolder));
    gulp.src("source/"+appSourcePathName+'/component/*.html')
        .pipe(gulp.dest(outputComponentFolder));
     gulp.src("source/"+appSourcePathName+'/component/swfupload/*.swf')
        .pipe(gulp.dest(outputComponentswfuploadFolder));
    gulp.src("source/"+appSourcePathName+'/component/swfupload/*.js')
        .pipe(gulp.dest(outputComponentswfuploadFolder));
    gulp.src("source/"+appSourcePathName+'/shiftjs/*.js')
        .pipe(gulp.dest(outputComponentFolderjs));
    gulp.src("source/"+appSourcePathName+'/*.js')
        .pipe(gulp.dest(outputFolder));
    gulp.src("scripts/css/*.css")
        .pipe(gulp.dest(outputRootFolder+"/scripts/css"));
      gulp.src("source/"+appSourcePathName+'/*.json')
        .pipe(gulp.dest(outputFolder));
 
 
});

//******************************************************************************
//* DEV SERVER
//******************************************************************************

//var currentStartpage="domesticfilght.html?user=demo1&ucode=bTqoF2CcMCj7uIOBllZtDw=="; 
//var currentStartpage="internationalfilght.html?user=demo1&ucode=bTqoF2CcMCj7uIOBllZtDw==";
var currentStartpage="internationalmanage.html?user=demo1&ucode=bTqoF2CcMCj7uIOBllZtDw==";

gulp.task("watch", ["default"], function () {
    
    browserSync.init({
        server: "./"+appPublishPathName+"/"+appSourcePathName,
        startPath: "/"+currentStartpage
        
    });
    //test2
    gulp.watch([ "source/**/**.json","scripts/css/*.css","source/**/**.ts","source/**/**.js","source/**/**.html", "test/**/*.ts"], ["default"]);
    gulp.watch(appPublishPathName+"/"+appSourcePathName+"/dist/*.*").on('change', browserSync.reload); 
});

//******************************************************************************
//* DEFAULT
//******************************************************************************
gulp.task("default", function (cb) {
    runSequence("lint", "build", "test", "bundle", cb);
});