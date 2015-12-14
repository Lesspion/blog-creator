var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BlogSchema   = new Schema({
	id_user: {type: Schema.ObjectId, ref: 'User'},
	name: String,
	category: String
});

module.exports = mongoose.model('Blog', BlogSchema);