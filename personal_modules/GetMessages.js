var Message = require('../models/Message');
var Picture = require('./Picture');

var MessageService = {
	getAll: function (id_user, callback) {
		Message.find({id_blogger: id_user})
		   .populate('id_blogger')
		   .populate('id_sender').exec(function (err, messages) {
				var messagesList = [];
				for (var i = 0; i < messages.length; i++) {
					var temp = {};
					
					temp._id         = messages[i]._id;
					temp.author      = messages[i].id_sender.pseudo;
					temp.text        = messages[i].text;
					temp.picture     = Picture.Profil.get(messages[i].id_sender._id);
					temp.createdAt   = messages[i].created_at;
					
					messagesList.push(temp);
				}
				callback.call(this, messagesList);
			});
	},
	post: function (msgObject) {
		var msg        = new Message();
		msg.id_blogger = msgObject.id_blogger;
		msg.id_sender  = msgObject.id_sender;
		msg.text       = msgObject.text;
		msg.created_at = Date.now();
		
		msg.save(function (err) {
			return msg;	
		});
	}
};

module.exports = MessageService;