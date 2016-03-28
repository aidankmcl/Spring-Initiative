var express = require('express');
var path = require('path');
var routes = {};
var path = require('path');
var passport = require('passport');

var User = require(path.join(__dirname,'../models/user'));
var Attendence = require(path.join(__dirname,'../models/studentDataModel')).attendence;
var Data = require(path.join(__dirname,'../models/studentDataModel')).data;
var Student = require(path.join(__dirname,'../models/studentDataModel')).student;
var Grades = require(path.join(__dirname,'../models/studentDataModel')).grades;

routes.POSTlogin = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.status(500).send(err.message); }
    if (!user) {
      return res.status(401)
      .send(info.message);}
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.send({redirect: '/'});
    });
  })(req, res, next);
}

routes.POSTregister = function(req, res, next) {
  User.register(new User({ email: req.body.username }), req.body.password,
                function(err, user) {
    if (err) {
      console.log('error while user register!', err); return next(err);
    }
    console.log('user registered!');
    console.log(user.authToken);
    //send email verification
    var authenticationURL = 'http://localhost:3000/verify?authToken=' + user.authToken;
    sendgrid.send({
      to:       account.email,
      from:     'emailauth@yourdomain.com',
      subject:  'Confirm your email',
      html:     '<a target=_blank href=\"' + authenticationURL + '\">Confirm your email</a>'
      }, function(err, json) {
      if (err) { return console.error(err); }
    });

    passport.authenticate('local')(req, res, function () {
      res.send({redirect: '/'});
    });
  });
}

routes.GETindex = function(req, res){
  // Student.find
  // res.JSON({students: allStudents});
  res.sendFile('index.html', { root: path.join(__dirname, '../views') });
}

routes.GETlogin = function(req, res){
  res.sendFile('login.html', { root: path.join(__dirname, '../views') });
}

routes.GETprogram = function(req, res, next) {
  res.sendFile('index.html', { root: path.join(__dirname, '../views') });
}

routes.GETstudent = function(req, res, next) {
  res.sendFile('index.html', { root: path.join(__dirname, '../views') });
}

routes.POSTeditstudent = function(req, res, next) {
  res.sendFile('index.html', { root: path.join(__dirname, '../views') });
}

routes.POSTaddstudent = function(req, res, next) {
  res.sendFile('index.html', { root: path.join(__dirname, '../views') });
}

routes.GETarchive = function(req, res, next) {
  res.sendFile('index.html', { root: path.join(__dirname, '../views') });
}

module.exports = routes;
