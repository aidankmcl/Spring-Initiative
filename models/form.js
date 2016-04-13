var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var formSchema = Schema({
  _studentID: { type: Schema.Types.ObjectId, ref: 'Student' },
  period: String,
  date: Number,
  attendance: String,
  behaviorText: String,
  warnings: String,
  stars: Number,
  engagingContent: Number,
  engagingPeers: Number,
  schoolBehavior: [Boolean],
  actionSteps: String,
  grades: String,
  readingLevels: String,
  teacherFeedback: String
});

module.exports = mongoose.model('Form', formSchema);
