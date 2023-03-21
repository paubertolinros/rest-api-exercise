require('dotenv').config();
require('./db');
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

// Routers require
const indexRouter = require('./routes/index');
const showsRouter = require('./routes/shows');

const app = express();

// cookies and loggers
// app.use(cors ({
//   origin: process.env.ORIGIN
// }));
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes intro
app.use('/', indexRouter);
app.use('/shows', showsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  if (err.status === 404) {
    res.status(404).json({ errorMessage: `Could not find ${req.url}` });
  } else {
    res.status(err.status || 500).json({ errorMessage: err })
  }
});

module.exports = app;
