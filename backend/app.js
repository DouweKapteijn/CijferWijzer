var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
require('dotenv').config();

// multer setup
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
// After defining the upload variable




const db = require('./database')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/manager/users');

// auth setup
var loginRouter = require('./routes/AUTH/login');
var registerRouter = require('./routes/AUTH/register');
var dycryptRouter = require('./routes/AUTH/dycrypt');

// student setup
var studentRouter = require('./routes/student/getgrades');

// teacher setup
var teacherGetClass = require('./routes/teacher/getclass');
var teacherStudentProfile = require('./routes/teacher/studentprofile');



// data setup
var dataGetClass = require('./routes/data/getclasses');
var dataGetSubjects = require('./routes/data/getsubjects');

var app = express();

// CORS setup
app.use(cors())
// multer UPLOAD NONE
app.use(upload.none());

// view engine setup !!!! {}
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//checkRole function
const checkRole = require('./middleware');

const student = 1;
const teacher = 2;
const manager = 3;
// routes setup
app.use('/', indexRouter);
app.use('/users', usersRouter);

// AUTH setup
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/dycrypt', checkRole([student, teacher, manager]), dycryptRouter);

// student setup
app.use('/student', checkRole([student]), studentRouter);

// teacher setup
app.use('/teacher', checkRole([teacher]), teacherGetClass);
app.use('/teacher', checkRole([teacher]), teacherStudentProfile);

// data setup
app.use('/data', checkRole([student, teacher, manager]), dataGetClass);
app.use('/data', checkRole([student, teacher, manager]), dataGetSubjects);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler  !!!! {}
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
