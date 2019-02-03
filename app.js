const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const compression = require('compression');
const helmet = require('helmet');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const flash = require('connect-flash');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const noticesRouter = require('./routes/notices');

const passportConfig = require('./lib/passport-config');

const app = express();

// session initialize
app.use(session({
  secret: 'need-to-change-this-key',  // Need to change for security
  resave: false,
  saveUninitialized: true
}));

// enable flash messages
app.use(flash());

// passport initialize
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// enable ejs to use library
app.locals.moment = require('moment');

// mongoose initialize
mongoose.Promise = global.Promise;  // use ES6 Native Promise in mongoose
mongoose.connect('mongodb://localhost/aonedb', { useNewUrlParser: true, useCreateIndex: true });
mongoose.connection.on('error', console.error);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());
app.use(helmet());

// send current user info & flash message to ejs
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.flashMessages = req.flash();
  next();
});

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/notice', noticesRouter);
require('./routes/auth')(app, passport);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;