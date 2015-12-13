var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
	pseudo: String,
	birthday: Date,
    about_me: String,
	friend: [{type: Schema.ObjectId, ref: 'User'}],
    registration_date: String
});

module.exports = mongoose.model('User', UserSchema);