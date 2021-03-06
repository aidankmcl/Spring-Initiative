var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportEmail = require('passport-local-mongoose-email');

var User = new Schema({
  isAdmin: {type: Boolean, default: false},
  adminAuth: {type: String, default: null}, // admin is first half of authToken
  userAuth: {type: String, default: null}  // user is second half of authToken
});

// Passport Email used here
User.plugin(passportEmail, {
  usernameField: 'email',
});

module.exports = mongoose.model('User', User);
