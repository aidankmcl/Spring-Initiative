var mongoose = require('mongoose');

var schoolSchema = new mongoose.Schema({
	name: String,
	students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
}, {strict: false});

module.exports = mongoose.model('School', schoolSchema);
