
var routes = {};
var path = require('path');
var Notes = require(path.join(__dirname, '../models/notes'));
var objectIdWithTimestamp = require(path.join(__dirname, '../utils/functions')).objectIdWithTimestamp;

var logErr = function(err, res) {
  console.log(err);
  res.send(err);
  return res.status(500).json({ msg: err });
}

var getKeys = function(notes) {
  var keys = {};
  notes.forEach(function(note) {
    for (var key in note) keys[key] = key;
  });
  return keys;
}

routes.POSTnote = function(req, res, next) {
  Notes.create(req.body, function(err, newNote) {
    if (err) return logErr(err, res);
    res.json({ msg: 'New note added successfully', content: newNote });
  });
}

routes.GETnote = function(req, res, next) {
  Notes.find({_id: req.params._id}, function(err, note) {
    if (err) return logErr(err, res);
    res.json(note);
  });
}

routes.GETnotes = function(req, res, next) {
  var search = {
    noteType: req.query.noteType,
    entityID: { '$in': req.query.IDs.split(',') },
    _id: {
      "$lte": objectIdWithTimestamp(req.query.endDate),
      "$gte": objectIdWithTimestamp(req.query.startDate)
    }
  }

  Notes.find(search, function(err, notes) {
    if (err) return logErr(err, res);
    var keys = getKeys(notes);
    for (var i=0; i<notes.length; i++) {
      notes[i]['date'] = notes[i]['date'] || notes[i]._id.getTimestamp().getTime();
    }
    res.json({ data: notes, noteFields: keys });
  }).lean();
}

routes.POSTeditNote = function(req, res, next) {
  res.json({msg: "you're good!"})
}

module.exports = routes;
