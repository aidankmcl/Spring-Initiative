var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var sassMiddleware = require('node-sass-middleware');

var index = require('./routes/index');
var users = require('./routes/users');
// requires the model with Passport-Local plugged in
var User = require('./models/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  debug: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('express-session')({
  secret: process.env.SESSION_SECRET || "development_secret",
  resave: false,
  saveUninitialized: false
}));

// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/users', users);

app.get('/verify', index.GETemailver);
app.get('/user', function(req, res, next) {
  res.json({user: req.user});
})
app.post('/api/login', index.POSTlogin);
app.post('/api/logout', index.POSTlogout);
app.post('/api/register', index.POSTregister);

var noteRoutes = require(path.join(__dirname, './routes/noteRoutes'));
app.get('/api/notes', noteRoutes.GETnotes);
app.get('/api/notes/:_id', noteRoutes.GETnote);
app.post('/api/notes/add', noteRoutes.POSTnote);
app.post('/api/notes/edit', noteRoutes.POSTeditNote);

var schemaRoutes = require(path.join(__dirname, './routes/schemaRoutes'));
app.post('/api/schema/get', schemaRoutes.GETschema);
app.post('/api/schema/add', schemaRoutes.POSTschema);
app.put('/api/schema/:_id', schemaRoutes.PUTupdateSchema);
app.delete('/api/schema/:_id', schemaRoutes.DELETEschema);

var cohortRoutes = require(path.join(__dirname, './routes/cohortRoutes'));
app.get('/api/cohorts/:_id', cohortRoutes.GETcohort);
app.get('/api/cohorts', cohortRoutes.GETcohorts);
app.post('/api/cohorts', cohortRoutes.POSTcohort);
app.put('/api/cohorts/:_id', cohortRoutes.PUTupdateCohort);
app.delete('/api/cohorts/:_id', cohortRoutes.DELETEcohort);

var actionStepRoutes = require(path.join(__dirname, './routes/actionStepRoutes'));
app.get('/api/action-steps', actionStepRoutes.GETactionSteps);
app.get('/api/action-steps/:_id', actionStepRoutes.GETactionStep);
app.post('/api/action-steps', actionStepRoutes.POSTactionStep);
app.put('/api/action-steps/:_id', actionStepRoutes.PUTupdateActionStep);

var studentRoutes = require(path.join(__dirname, './routes/studentRoutes'));
app.get('/api/students/:_id', studentRoutes.GETstudent);
app.delete('/api/students/:_id', studentRoutes.DELETEstudent);
app.get('/api/students', studentRoutes.GETallStudents);
app.post('/api/students/add', studentRoutes.POSTstudent);
// app.get('/api/allStudents', index.GETallStudents);
// app.get('/api/student/allEntries', index.GETallStudentEntries);
// app.get('/api/student/:_id', index.GETstudent);
// app.post('/api/student/add', index.POSTaddstudent);
// app.post('/api/student/edit/:_id', index.POSTeditstudent);
// app.delete('/api/student/:_id', index.DELETEstudent);
// app.get('/api/index/archive', index.GETarchive);
// app.get('/api/student/dataList/:_id', index.GETstudentEntriesList);
// app.get('/api/student/data/:_id/:dataType', index.GETstudentEntries);
// app.post('/api/student/newDailyEntry/:_id', index.POSTnewDailyEntry);
// app.post('/api/student/newLongEntry/:_id', index.POSTnewLongEntry);

app.get('/api/allUsers', index.GETallUsers);
app.post('/api/changeAdmin/:_id', index.POSTchangeAdmin);
app.post('/api/changePassword/:_id', index.POSTchangePassword);
app.delete('/api/delUser/:_id', index.DELETEdelUser);
// app.get('/api/cohort/data/:cohort', index.GETcohortEntries);
// app.post('/api/editOverview/', index.POSTeditOverview);

// app.get('/api/overview', index.GEToverview);

app.use(function(req, res) {
  // Use res.sendfile, as it streams instead of reading the file into memory.
  res.sendFile('main.html', { root: path.join(__dirname, 'views') });
});

var mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
mongoose.connect(mongoURI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db connection successful!');
});

// use static authenticate method of model in LocalStrategy
// passport.use(User.createStrategy());
passport.use(new LocalStrategy(User.authenticate()));
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();
  // if they aren't send an error
  res.sendStatus(401);
}

module.exports = app;
