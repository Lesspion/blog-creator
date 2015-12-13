var express 	= require('express');
var app 		= express();
var md5 		= require('md5');
var User 		= require('../models/User');

app.post('/signup', function (req, res) {
	var user = new User();	
	
	if (typeof req.body.email === "undefined" || typeof req.body.password === "undefined" || typeof req.body.pseudo === "undefined") {
		res.json({error: true, message: "Un champs est manquant"});
		return;
	} else {
		User.findOne({email: req.body.email}, function (err, finder) {
			if (!finder) {
				user.pseudo = req.body.pseudo;
				user.email = req.body.email;
				user.password = md5(req.body.password);
				var today = new Date();
				var dd = today.getDate();
				var mm = today.getMonth() + 1;
				var yyyy = today.getFullYear();
			    if (dd < 10) {
			        dd = '0' + dd;
			    } 
			    if (mm < 10) {
			        mm = '0' + mm;
			    }
			    var today = dd + '/' + mm + '/' + yyyy;
				user.registration_date = today;

				user.save(function (err) {
					if (err)
						res.send(err);
					req.session.id = user._id;
					req.session.pseudo = user.pseudo;
					res.render('index', {
						pagename: "HomePage",
						authors: ['Adeline', 'Chris'],
						connected: true,
						session: req.session
					});
				});
			} else {
				res.render('index', {
					pagename: "HomePage",
					authors: ['Adeline', 'Chris'],
					error: true,
					message: "Email is already taken"
				});
			}
		});
	}
});

app.post('/login', function (req, res) {
	if (!req.body.email || !req.body.password) {
		res.render('index', {
			pagename: "HomePage",
			authors: ['Adeline', 'Chris'],
			error: true,
			message: "Email or password field is missing"
		});
	} else {
		User.findOne({email: req.body.email, password: md5(req.body.password)}, function (err, user) {
			if (user) {
				req.session.id = user._id;
				req.session.pseudo = user.pseudo;
				if (user.firstname) {
					req.session.firstname = user.firstname;
				}
				if (user.lastname) {
					req.session.lastname = user.lastname;
				}
				res.render('index', {
					pagename: "HomePage",
					authors: ['Adeline', 'Chris'],
					session: req.session
				});
			} else {
				res.render('index', {
					pagename: "HomePage",
					authors: ['Adeline', 'Chris'],
					error: true,
					message: "Wrong email or password"
				});
			}
		});
	}
});

app.put('/user/:id_user', function (req, res) {
	User.findOne({
		_id: req.params.id_user
	}, function (err, user) {
		if (err)
			res.send(err);

		if (req.body.affinities) {
			for (var i = 0; i < req.body.affinities.length; i++) {
				user.affinities.push(req.body.affinities[i]);
			}
		}

		if (req.body.skills) {
			for (var i = 0; i < req.body.skills.length; i++) {
				user.skills.push(req.body.skills[i]);
			}
		}

		if (req.body.about_me) {
			user.about_me = req.body.about_me;
		}

		if (req.body.lat) {
			user.lat = req.body.lat;
		}

		if (req.body.lng) {
			user.lng = req.body.lng;
		}

		if (req.body.job_title) {
			user.job_title = req.body.job_title;
		}

		if (req.body.phone) {
			user.phone = req.body.phone;
		}

		user.save(function (err2) {
			if (err2)
				res.send(err2);
			res.json({message: "user updated !"});
		});
	});
});

app.delete('/remove/:id_user', function (req, res) {
	User.remove({
		_id: req.params.id_user
	}, function (err, user) {
		if (err)
			res.send(err);
		res.json({error: false, message: "User deleted !"});
	});
});


app.get('/user/:id_user', function (req, res) {
	User.findOne({_id: req.params.id_user}).populate('skills').populate('affinities')
	.exec(function (err, user) {
		res.json({error: false, firstname: user.firstname, lastname: user.lastname, email: user.email, id: user._id, skills: user.skills, affinities: user.affinities});
	});
});

app.get('/test/:id_user', function (req, res) {
	User.findOne({
		_id: req.params.id_user
	}).populate('skills')
	.exec(function (err, user) {
		if (err)
			res.send(err);
		console.log(user.skills);
		res.json({msg: true});
	})
});

app.post('/user/profile-picture/:id_user', function (req, res) {
	User.findOne({
		_id: req.params.id_user
	}, function (err, user) {
		if (err)
			res.send(err);
		var pic = req.body.picture;
		var format = req.body.format;
		if (req.body.picture === "undefined" || req.body.picture === "" || req.body.picture === null) {
			res.json({error: true, message: "Put a valid image"});
		} else if (req.body.format === "undefined" || req.body.format === "" || req.body.format === null) {
			res.json({error: true, message: "Put a valid image with a correct format"});
		} else {

			if (format == "jpg") {
				var base64Data = pic.replace(/^data:image\/jpg;base64,/, "");
			} else if (format == "png") {
				var base64Data = pic.replace(/^data:image\/png;base64,/, "");
			} else {
				var base64Data = pic.replace(/^data:image\/jpeg;base64,/, "");
			}
			
			//if (require('fs').)


			require("fs").writeFile("profile_picture/" + req.params.id_user/* + "." + format*/, base64Data, 'base64', function(err2) {
	  			if (err2)
	  				console.log(err2);
	  			res.json({error: false, message: "The picture was uloaded with success!"});
			});
		}
	});
});

module.exports = app;