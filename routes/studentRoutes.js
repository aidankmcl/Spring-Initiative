/*ROUTES: Routes related to students
This file contains routes for geting all student data, getting data for an individual student,
editing a student's information, deleting a student, adding a student, and viewing archived students*/

var path = require('path');
var routes = {};
var Student = require(path.join(__dirname, '../models/student'));

var logErr = function(err, res) {
  res.send(err);
  return res.status(500).json({ msg: err });
}

routes.GETallStudents = function(req, res, next) {
  Student.find({}, function(err, allStudents) {
    res.json({data: allStudents});
  });
}

routes.GETstudent = function(req, res, next) {
  Student.findOne({
    _id: req.params._id
  }, function(err, currentStudent) {
    if (err) return logErr(err, res);
    res.json({ data: currentStudent });
  });
};

routes.POSTstudent = function(req, res, next) {
  Student.create(req.body, function(err, newStudent) {
    if (err) return logErr(err, res);
    res.json({ msg: 'New student added successfully', content: newStudent });
  });
};

routes.POSTeditstudent = function(req, res, next) {
  var studentName = req.body.name;
  var studentProgram = req.body.program;
  var studentArchived = req.body.archived;
  var studentID = req.params._id;
  var studentOverview = req.body.overview;
  var studentActionSteps = req.body.actionSteps;

  Student.update({
    _id: studentID
  }, {
    name: studentName,
    program: studentProgram,
    archived: studentArchived,
    overview: studentOverview,
    actionSteps: studentActionSteps
  }, function(err, record) {
    if (err) logErr(err, res);
    res.json({ msg: "Student edited successfully" })
  });

};

routes.DELETEstudent = function(req, res, next) {
  var studentID = req.params._id;
  Student.findByIdAndRemove(studentID, function(error, doc, result) {
    if (error) {
      return res.status(500).json({msg: 'Error deleting student'});
    }
    Student.find({}, function(err, allStudents) {
      res.json(allStudents);
    });
  });
};

module.exports = routes;
