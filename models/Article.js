var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var Affinities   = require('./affinities.js');
var Skills       = require('./skills.js');

var ArticleSchema   = new Schema({
	id_blog: {type: Schema.ObjectId, ref: "Blog"},
	text: String,
	title: String,
	image: [String],
	commentaires: [{type: Schema.ObjectId, ref: "Commentaire"}],
	created_at: Date,
	updated_at: Date
});

module.exports = mongoose.model('Article', ArticleSchema);