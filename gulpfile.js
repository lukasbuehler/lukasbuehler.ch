// gulpfile.js

var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var del = require("del");
var flatten = require('gulp-flatten');
var rename = require('gulp-rename');
var glob = require('glob');
var es = require('event-stream');
var argv = require('yargs').argv;
var fs = require('fs');

// All the important paths
var paths = {
    baseDir: ".",
    endHtml: "*.html",
    endScripts: "*.ts",
    endScss: "*.scss",
    prodDest: "./dist/",
    testDest: "./tmp/",
    outputScript: "bundle.js",
    entry: "index.ts",
    src: "./src/**/"
};

// Some other vars
var reimportMedia = false;
var cleanedDest = false;

var watchDest = true;
var productionBuild = false;
var destination = paths.testDest; // the standard
var openBrowser = true;

if (argv.prod && !argv.test)
{
    productionBuild = true;
    watchDest = false;
    destination = paths.prodDest;
}

gulp.task("copy-html", ["clean-dest"], function ()
{
    return gulp.src(paths.src+paths.endHtml)
        .pipe(flatten())
        .pipe(gulp.dest(destination))
        .pipe(browserSync.reload({ stream: true })); // Reload browser
});

// Sass task: Compile SCSS files to CSS // scss ending
gulp.task('sass', ["clean-dest"], function () {
    return gulp.src(paths.src+paths.endScss)
      .pipe(sass())
      .on('error', sass.logError)
      .pipe(flatten())
      .pipe(gulp.dest(destination))
      .pipe(browserSync.reload({ stream: true })); // Reload browser
  });

gulp.task('watch', ["clean-dest"], function ()
{
    if (watchDest)
    {
        gulp.watch(paths.src+paths.endScss, ['sass']); // Watch sass files
        gulp.watch(paths.src+paths.endScripts, ['scripts']); // Watch .ts files
        gulp.watch(paths.src+paths.endHtml, ['copy-html']); // Watch html files
        // There is no watch function for images and fonts at the moment, it is not considered necessairy
    }
});

// Browser sync task: to launch a server and auto-reload
gulp.task('browser-sync', ["clean-dest", 'copy-html', 'scripts', "sass", "copy-media"], function ()
{
    if (openBrowser)
    {
        browserSync({
            server: {
                baseDir: destination
            }
        });
    }

});

// Reload browser
gulp.task('reload', function ()
{
    browserSync.reload();
});


gulp.task('clean-dest', function ()
{
    var arr = [];

    if (!cleanedDest)
    {
        arr.push(destination + "**/*");

        if (!reimportMedia)
        {
            arr.push(String("!" + destination + "resources/**/*"));
        }
        cleanedDest = true;
    }
    return del(arr);
});

gulp.task("copy-media", ["clean-dest"], function ()
{
    return gulp.src(paths.src+"resources/**/*")
        .pipe(gulp.dest(destination + "resources/"));
});


gulp.task("scripts", ["clean-dest"], function (done)
{
    glob(paths.src+paths.entry, function (err, files)
    {
        if (err) done(err);

        var tasks = files.map(function (entry)
        {
            return browserify({
                basedir: paths.baseDir,
                debug: true,
                entries: entry,
                cache: {},
                packageCache: {}
            })
                .plugin(tsify)
                .bundle()
                .pipe(source(entry))
                .pipe(flatten())
                .pipe(rename('bundle.js'))
                .pipe(gulp.dest(destination))
                .pipe(browserSync.reload({ stream: true })); // Reload browser
        });
        es.merge(tasks).on('end', done);
    })
});

gulp.task("default", ["scripts", "sass", "copy-html", "clean-dest", "copy-media", "browser-sync", "watch"]);
