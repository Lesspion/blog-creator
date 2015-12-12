var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BeMyFriendSchema   = new Schema({
	id_applicant: {type: Schema.ObjectId, ref: "User"},
	id_friend_asked: {type: Schema.ObjectId, ref: "User"}
});

module.exports = mongoose.model('BeMyFriend', BeMyFriendSchema);