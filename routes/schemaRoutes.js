
var routes = {};
var path = require('path');
var Schema = require(path.join(__dirname, '../models/schemas.js'));

var logErr = function(err, res) {
  res.send(err);
  return res.status(500).json({ msg: err });
}

routes.POSTschema = function(req, res, next) {
  // TODO: Cannot just take in request body
  Schema.create(req.body, function(err, newSchema) {
    if (err) return logErr(err, res);
    res.json({msg: 'New schema added successfully', data: newSchema });
  });
}

routes.GETschema = function(req, res, next) {
  // TODO: Cannot just take in request body
  Schema.find(req.body, function(err, schemas) {
    if (err) return logErr(err, res);
    res.json({msg: 'Schemas retrieved successfully', data: schemas});
  });
}

routes.DELETEschema = function(req, res, next) {
  var schemaID = req.params._id;
  Schema.findByIdAndRemove(schemaID, function(err, doc, result) {
    if (err) return logErr(err, res);
    res.json({msg: "Schema deleted successfully" });
  });
};

routes.PUTupdateSchema = function(req, res, next) {
  Schema.update({ '_id': req.params._id }, { '$set': req.body }, function(err, schema) {
    if (err) return logErr(err, res);
    res.json({ message: 'Schema updated!', data: schema});
  });
}

module.exports = routes;
