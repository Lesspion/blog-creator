var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ArticleSchema   = new Schema({
	id_blog: {type: Schema.ObjectId, ref: "Blog"},
	text: String,
	title: String,
	image: [String],
	created_at: Date,
	updated_at: Date
});

module.exports = mongoose.model('Article', ArticleSchema);