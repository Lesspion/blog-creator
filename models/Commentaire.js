var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CommentaireSchema   = new Schema({
    id_user: {type: Schema.ObjectId, ref: "User"},
    content: String,
    created_at: Date
});

module.exports = mongoose.model('Commentaire', CommentaireSchema);