var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MessageSchema   = new Schema({
	id_sender: {type: Schema.ObjectId, ref: "User"},
	id_receiver: {type: Schema.ObjectId, ref: "User"},
	view: Boolean
});

module.exports = mongoose.model('Message', MessageSchema);