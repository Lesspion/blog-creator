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

router.post('/message', function (req, res) {
	console.log('i"m here');
	Msg.post(req.body.message);
});

module.exports  = router;