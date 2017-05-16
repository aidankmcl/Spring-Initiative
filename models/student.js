var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
  name: String,
  archived: Boolean,
  program: { type: mongoose.Schema.Types.ObjectId, ref: 'Cohort' },
  notes : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notes' }],
  actionSteps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ActionStep' }],
}, {strict: false});

module.exports = mongoose.model('Student', studentSchema);
