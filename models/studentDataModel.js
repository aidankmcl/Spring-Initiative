<<<<<<< HEAD
var mongoose = require('mongoose');   
​
=======
var mongoose = require('mongoose');
var Schema = mongoose.Schema


>>>>>>> 0b968a3be7f4a41b676179641233e9d68fc6593c
var dataSchema = mongoose.Schema({
	type: String,
	date: Date,
	data: Array
});

var studentSchema = mongoose.Schema({
	id: Number,
	name: String,
	program: String,
	attendance: [{type: Schema.ObjectId, ref: 'Attendance'}],
	grades: [{type: Schema.ObjectId, ref: 'Grades'}],
	data: [{type: Schema.ObjectId, ref: 'Data'}],
	archived: Boolean
});

var userSchema = mongoose.Schema({
	username: String,
	password: String
});

module.exports.attendace = mongoose.model('Attendace', dataSchema); 
module.exports.grades = mongoose.model('Grades', dataSchema); 
module.exports.data = mongoose.model('Data', dataSchema); 
module.exports.student = mongoose.model('Student', studentSchema);
module.exports.student = mongoose.model('User', userSchema);