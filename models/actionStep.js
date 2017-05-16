var mongoose = require('mongoose');

var actionStepSchema = mongoose.Schema({
  description: String,
  studentID: String,
  complete: Boolean,
  result: String,
}, {strict: false});

module.exports = mongoose.model('ActionStep', actionStepSchema);
