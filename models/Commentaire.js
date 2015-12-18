var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CommentaireSchema   = new Schema({
    id_article: {type: Schema.ObjectId, ref: "Article"},
    id_user: {type: Schema.ObjectId, ref: "User"},
    content: String,
    createdAt: Date
});

module.exports = mongoose.model('Commentaire', CommentaireSchema);