var mongoose = require('mongoose');
var noteSchema = new mongoose.Schema({
	_student : { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
	noteType: String,
	archived: Boolean,
	entityID: String,
}, {strict: false});

module.exports = mongoose.model('Notes', noteSchema);
