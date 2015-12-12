var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
	login: String,
	birthday: Date,
    about_me: String,
	friend: [{type: Schema.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('User', UserSchema);