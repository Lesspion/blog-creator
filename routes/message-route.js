var express 	= require('express');
var app 		= express();
var router      = express.Router();
var User 		= require('../models/User');
var Blog 		= require('../models/Blog');
var Message     = require('../models/Message');
var Msg         = require('../personal_modules/GetMessages');

app.get('/all/message/:id_user', function (req, res) {
	Message.find({id_blogger: req.params.id_user})
		   .populate('id_blogger')
		   .populate('id_sender').exec(function (err, messages) {
				
			});
});

app.post('/message', function (req, res) {
	var msg        = new Message();
		msg.id_blogger = req.body.id_blogger;
		msg.id_sender  = req.body.id_sender;
		msg.text       = req.body.msg;
		msg.created_at = Date.now();
		
		msg.save(function (err) {
			res.redirect('/profil/' + req.body.id_sender);
		});
});

module.exports  = app;