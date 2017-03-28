
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
    res.json({msg: 'New schema added successfully', data: schemas});
  });
}

routes.DELETEschema = function(req, res, next) {
  var schemaID = req.params._id;
  Schema.findByIdAndRemove(schemaID, function(err, doc, result) {
    if (err) return logErr(err, res);
    res.json({msg: "Schema deleted successfully" });
  });
};

routes.POSTeditSchema = function(req, res, next) {
  res.json({msg: "you're good!"})
}

module.exports = routes;
