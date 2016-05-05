/************************************
 * main server requirements for app
 ***********************************/
// main components
var gulp = require('gulp');
var gutil = require('gulp-util');// server logging
var jshint = require('gulp-jshint'); // javascript code validation
var plumber = require('gulp-plumber');

// Express
var express = require('express');
var mongoose = require('mongoose'); // mongo connections
var session = require('express-session'); // server session
var bcrypt = require('bcrypt-nodejs'); // encryption
var bodyParser = require('body-parser'); // normal body parser
var multiBodyParser = require('busboy-body-parser'); // multipart form data body parser
var morgan = require('morgan'); // server request logging
var fs = require('fs');
var https = require('https');
var http = require('http');
// CSS plugins
var less = require('gulp-less'); // less file parsing
var prefixer = require('gulp-autoprefixer'); // add vendor specific css prefixes
var minifycss = require('gulp-clean-css'); // minify css
// JS plugins
var concat = require('gulp-concat'); // concat files into single file
var uglify = require('gulp-uglify'); // obfuscate javascript
// Templating plugins
var jade = require('gulp-jade'); // jade file parsing
// Utility plugins
var sourcemaps = require('gulp-sourcemaps'); // map source back to dev code
var rename = require('gulp-rename'); // file renaming

// main server
var server = express();
// load main configuration options
var config = require('./config/config');
// connect to database
mongoose.connect(config.database.url);

server.use('/js', express.static(__dirname + '/dist/js'));
server.use('/libs', express.static(__dirname + '/dist/libs'));
server.use('/css', express.static(__dirname + '/dist/css'));
server.use('/fonts', express.static(__dirname + '/dist/fonts'));
server.use('/img', express.static(__dirname + '/dist/img'));
server.use('/views', express.static(__dirname + '/dist/views'));

// route apis
var apiRouter = express.Router();
var httpDetector = require('./routes/httpDetector');
server.use(httpDetector);

require('./routes/api.sentiment.routes')(apiRouter, bodyParser, multiBodyParser);
require('./routes/api.home.routes')(apiRouter, bodyParser, multiBodyParser);
server.use('/api', apiRouter);

// route core
var appRouter = express.Router();
require('./routes/app.routes')(appRouter, bodyParser, multiBodyParser);
server.use('/', appRouter);

// Error logging
server.use(morgan('dev'));

gulp.task('SetupDev', function() {
    // Servers
    lr = require('tiny-lr'); // dev live refresh
    livereload = require('connect-livereload'); // dev live refresh
    refresh = require('gulp-livereload'); // dev llive refresh

    // setup live reload
    lrserver = lr();
});

/************************************
 * gulp distribution complilation
 ***********************************/
// Cleanup distribution directory
gulp.task('clean', function() {
    del = require('del'); // file deletion
    del(['./dist/*']);
});

 // code validation
gulp.task('lint', function() {
    gulp.src(config.build.paths.js)
      .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

// Javascript compilation
gulp.task('javascript', function() {
    gulp.src(config.build.paths.js)
        // .pipe(sourcemaps.init()) // map compiled back to dev source
        .pipe(concat(config.build.paths.shell.minJS, {newline: ';'})) // concat app javascript
        //.pipe(uglify({mangle: true}).on('error', gutil.log)) // uglify concatted javascript
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.build.paths.dist + '/js/')); // save to dist directory
});

// CSS and LESS compilation with Bootstrap theme
gulp.task('less', function () {
    gulp.src(config.build.paths.less)
        .pipe(less().on('error', gutil.log))
        .pipe(prefixer('last 10 versions'))
        // .pipe(sourcemaps.init()) // map compiled back to dev source
        .pipe(concat(config.build.paths.shell.minCSS))
        .pipe(minifycss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.build.paths.dist + '/css/'));
});

// jade to html
gulp.task('views', function() {
    gulp.src(config.build.paths.views)
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest(config.build.paths.dist + '/views/'));
});

// Client copy static files
gulp.task('copy-statics', function() {
    gulp.src(config.build.paths.statics)
        .pipe(gulp.dest(config.build.paths.dist));
});

// Reload on nodejs updates
gulp.task('refresh', function() {
    refresh(lrserver);
});

/************************************
 * gulp watch and server launch
 ***********************************/
// watch livereload on app changes
gulp.task('watch', function() {
    gulp.watch(config.build.paths.js, [ 'lint', 'javascript', 'refresh' ]);
    gulp.watch(config.build.paths.less, [ 'less', 'refresh' ]);
    gulp.watch(config.build.paths.views, [ 'views', 'refresh' ]);
    gulp.watch(['./client/js/shell.client.js', './client/index.html'], [ 'copy-statics', 'refresh' ]);
    gulp.watch(['./routes/*.js', './models/*.js', './config/*.js'], [ 'refresh' ]);
});

// development server
gulp.task('LaunchDev', function(next) {
    server.use(livereload({port: config.build.servers.dev.reloadPort}));
    server.use(express.static('./dist'));

    server.listen(config.build.servers.dev.port);

    lrserver.listen(config.build.servers.dev.reloadPort);
    console.log('Server started on port ' + config.build.servers.dev.port);
    console.log('Live Reload started on port ' + config.build.servers.dev.reloadPort);
});

// dev environment, compilation
gulp.task('dev',[ 'SetupDev', 'lint', 'javascript', 'less', 'views', 'copy-statics', 'watch', 'LaunchDev' ]);

gulp.task('debug', ['lint']);

