var express 	= require('express');
var app 		= express();
var User 		= require('../models/User');
var Friend 		= require('../models/BeMyFriend');

app.get('/friend/:futur_friend', function (req,res) {
	if (req.params.futur_friend) {
		var friendy = new Friend();
		friendy.id_applicant = req.session.id;
		friendy.id_friend_asked = req.params.futur_friend;
		friendy.save(function (err) {
			if (err)
				res.end(err);
			res.render('', {
				pagename: '',
				authors: ['Adeline', 'Chris']
			});
		});
	}
});

app.get('/friend', function (req, res) {
	User.findOne({
		_id: req.session.id
	}).populate('friend').exec(function (err, user) {
		res.render('', {
			pagename: '',
			authors: ['Adeline', 'Chris'],
			friends: user.friend
		});
	});
});



module.exports = app;