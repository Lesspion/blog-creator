var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MessageSchema   = new Schema({
	id_blogger: {type: Schema.ObjectId, ref: "User"},
	id_sender: {type: Schema.ObjectId, ref: "User"},
	text: String,
	view: Boolean
});

module.exports = mongoose.model('Message', MessageSchema);