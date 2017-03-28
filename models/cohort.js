var mongoose = require('mongoose');

var cohortSchema = mongoose.Schema({
  name: String,
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  schools: [{ type: mongoose.Schema.Types.ObjectId, ref: 'School' }]
});

module.exports = mongoose.model('Cohort', cohortSchema);
