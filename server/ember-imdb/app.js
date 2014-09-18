var express = require('express');
var http = require('http');
var cors = require('cors')
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');
var movies = require('./routes/movie');
var actors = require('./routes/actor');
var directors = require('./routes/director');
var watchlist = require('./routes/watchlist');

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set("view options", {layout: false});

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

app.get('/movies', movies.list);
app.put('/movies/:movie_id', movies.update);
app.get('/movies/:movie_id', movies.get);
app.get('/actors', actors.get);
app.get('/actors/:actor_id', actors.get);
app.get('/directors/:director_id', directors.get);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    // var err = new Error('Not Found');
    // err.status = 404;
    // next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        // res.render('error', {
        //     message: err.message,
        //     error: err
        // });
});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
