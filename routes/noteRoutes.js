
var routes = {};
var path = require('path');
var Notes = require(path.join(__dirname, '../models/notes'));

var logErr = function(err, res) {
  res.send(err);
  return res.status(500).json({ msg: err });
}

routes.POSTnote = function(req, res, next) {
  console.log(req.body);
  Notes.create(req.body, function(err, newNote) {
    if (err) return logErr(err, res);
    res.json({ msg: 'New note added successfully', content: newNote });
  });
}

routes.GETnotes = function(req, res, next) {
  var search = {
    noteType: req.query.noteType,
    studentID: req.query.studentID
  }
  Notes.find(search, function(err, notes) {
    if (err) return logErr(err, res);
    res.json({ data: notes });
  });
}

routes.POSTeditNote = function(req, res, next) {
  res.json({msg: "you're good!"})
}

module.exports = routes;
