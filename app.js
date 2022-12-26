var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongo = require('mongoose');
var dotenv = require('dotenv');
var session = require('express-session');
//var passport = require('passport');
var indexRouter = require('./routes/users');
var cors = require('cors');

var userRoute = require('./routes/Route');
var billRoute = require('./routes/billRoute');
var prodRoute = require('./routes/prodRoute');
//const {loginCheck} = require('./auth/passport');
//loginCheck(passport);

var app = express();
// MongoDB connection
dotenv.config();
const database = process.env.MONGOLAB_URI;
mongo.connect(database, {useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log('Database connected'))
.catch(err => console.log(err));

/* view engine setup*/
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

//Cors
app.use(cors());

//BodyParsing
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/public/')));

// Passport and session
// app.use(passport.initialize());
// app.use(passport.session());

//Routes
//app.use('/', indexRouter);
app.use('/user', userRoute);
app.use('/bill', billRoute);
app.use('/product', prodRoute);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   //res.render('error');
// });

module.exports = app;
