/*ROUTES: Routes related to cohorts*/
var routes = {};
var path = require('path');
var Cohort = require(path.join(__dirname, '../models/cohort'));
var Student = require(path.join(__dirname, '../models/student'));

var logErr = function(err, res) {
  console.log(err);
  res.send(err);
  return res.status(500).json({ msg: err });
}

routes.POSTcohort = function(req, res, next) {
  var data = {
  	name: req.body.name,
  	students: [req.body.studentIDs],
  	schools: [req.body.schoolIDs],
  }
  Cohort.create(data, function(err, newCohort) {
    if (err) return logErr(err, res);
    res.json({msg: 'New Cohort added successfully', data: newCohort });
  });
}

routes.GETcohort = function(req, res, next) {
  Cohort.findOne({_id: req.params._id}, function(err, cohort) {
    if (err) return logErr(err, res);
    res.json({msg: 'Cohort retrieved successfully', data: cohort});
  });
}

routes.GETcohorts = function(req, res, next) {
  Cohort.find({}, function(err, cohorts) {
    if (err) return logErr(err, res);
    res.json({msg: 'Cohorts retrieved successfully', data: cohorts});
  });
}

routes.DELETEcohort = function(req, res, next) {
  var cohortID = req.params._id;
  Cohort.findByIdAndRemove(cohortID, function(err, doc, result) {
    if (err) return logErr(err, res);
    res.json({msg: "Cohort deleted successfully" });
  });
};

routes.PUTupdateCohort = function(req, res, next) {
  var data = {}
  if (req.body.students) data['students'] = req.body.students;
  if (req.body.schools) data['schools'] = req.body.schools;
  var multi = (req.body.students.length > 1) ? true : false;

  Cohort.update({ '_id': req.params._id }, data, function(err, cohort) {
    if (err) return logErr(err, res);
    Student.update({'_id': {'$in': req.body.students}}, {'program': req.params._id}, {multi: multi}, function(err, students) {
      if (err) return logErr(err, res);
      console.log(req.body.students);
      res.json({ message: 'Cohort updated!', data: cohort});
    });
  });
}

module.exports = routes;