var mongoose = require('mongoose');
var generalSchema = new mongoose.Schema({}, {strict: false});

module.exports = mongoose.model('School', generalSchema);