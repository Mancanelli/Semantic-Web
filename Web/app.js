// import modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');

// import routes file
var indexRouter = require('./routes/index');

var booksRouter = require('./routes/books');
var musicRouter = require('./routes/music');
var moviesRouter = require('./routes/movies');
var gamesRouter = require('./routes/games');

// define app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// define routes
app.use('/', indexRouter);

app.use('/books', booksRouter);
app.use('/music', musicRouter);
app.use('/movies', moviesRouter);
app.use('/games', gamesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.set('port', 3000);

var server = http.createServer(app);
server.listen(3000);
