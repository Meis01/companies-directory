var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var language = require('../middlewares/language')// to be global put it in app
require('dotenv').config()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminsRouter = require('./routes/admins'); // 
var companiesRouter = require('./routes/companies');
var provincesRouter = require('./routes/provinces');
var citiesRouter = require('./routes/cities');
var categoriesRouter = require('./routes/categories');
var adsRouter = require('./routes/ads');
var articlesRouter = require('./routes/articles');
var reviewsRouter = require('./routes/reviews');
var languagesRouter = require('./routes/languages');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(language)

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads',express.static(path.join(__dirname, 'uploads')));//everything in /uploads without routing display


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admins', adminsRouter);
app.use('/companies', companiesRouter); 
app.use('/provinces', provincesRouter);
app.use('/cities', citiesRouter);
app.use('/categories', categoriesRouter);
app.use('/ads', adsRouter);
app.use('/articles', articlesRouter);
app.use('/reviews', reviewsRouter);
app.use('/languages', languagesRouter);


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

module.exports = app;
