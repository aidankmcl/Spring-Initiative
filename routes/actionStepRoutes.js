/* ROUTES: Routes related to creating and viewing action steps */

var routes = {};
var path = require('path');
var _ = require('lodash');
var ActionStep = require(path.join(__dirname, '../models/actionStep'));
var objectIdWithTimestamp = require(path.join(__dirname, '../utils/functions')).objectIdWithTimestamp;

var logErr = function(err, res) {
  console.log(err);
  res.send(err);
  return res.status(500).json({ msg: err });
}

routes.POSTactionStep = function(req, res, next) {
	var actionSteps = _.map(req.body.studentIDs, function(studentID) {
		return { 
			description: req.body.description,
			studentID: studentID,
      complete: false
		}
	});
	
  ActionStep.create(actionSteps, function(err, newActionSteps) {
    if (err) return logErr(err, res);
    res.json({ msg: 'New Action Step added successfully', data: newActionSteps });
  });
}

routes.GETactionStep = function(req, res, next) {
   ActionStep.find({_id: req.params._id}, function(err, actionStep) {
    if (err) return logErr(err, res);
    res.json(actionStep);
  });
}

routes.GETactionSteps = function(req, res, next) {
  var search = {
    studentID: { '$in': req.query.studentIDs.split(',') },
    _id: {
      "$lte": objectIdWithTimestamp(req.query.endDate),
      "$gte": objectIdWithTimestamp(req.query.startDate)
    }
  }

  ActionStep.find(search, function(err, actionSteps) {
    if (err) return logErr(err, res);
    for (var i=0; i<actionSteps.length; i++) {
      actionSteps[i]['created'] = actionSteps[i]['created'] || actionSteps[i]._id.getTimestamp().getTime();
    }
    res.json({ data: actionSteps });
  }).lean();
}

routes.PUTupdateActionStep = function(req, res, next) {
  var data = { 
    complete: req.body.complete,
    result: req.body.result
  }
  ActionStep.update({ _id: req.params._id }, data, function(err, updatedRecord) {
    if (err) return logErr(err, res);
    res.json({ data: updatedRecord });
  });
}

module.exports = routes;