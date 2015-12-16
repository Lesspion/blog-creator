var express 	= require('express');
var app 		= express();
var User 		= require('../models/User');
var Blog 		= require('../models/Blog');

app.post('/create', function (req, res) {
	if (req.body.name != "undefined" && req.body.category !== "undefined" && req.session.id) {
		var blog = new Blog();
		blog.id_user = req.session._id;
		blog.name = req.body.name;
		blog.category = req.body.category;
		blog.save(function (err) {
			if (err)
				res.end(err);
			// res.render('BaseBack/profil', {
			// 	pagename: "Profil",
			// 	authors: ['Adeline', 'Chris'],
			// 	session: req.session,
			// 	success: "Blog created successfully"
			// });
			res.redirect('/profil');
		});
	} else {
		res.render('BaseBack/create', {
			pagename: "Article creation",
			authors: ['Adeline', 'Chris'],
			error: true,
			message: "Field blog name and category are required",
			session: req.session
		});
	}
});

app.get('/edit/:id_blog', function (req, res) {
	Blog.findOne({_id: req.params.id_blog}, function (err, blogy) {
		res.render('BaseBack/create', {
			pagename: "Article creation",
			authors: ['Adeline', 'Chris'],
			session: req.session,
			currentBlog: blogy
		});
	});
});

app.post('/edit/:id_blog', function (req,res) {
	Blog.findOne({_id: req.params.id_blog}, function (err, blogy) {
		if (req.body.category) {
			blogy.category = req.body.category;
		}
		if (req.body.nameBlog) {
			blogy.name = req.body.nameBlog;
		}
		blogy.save(function (err) {
			if (err)
			res.end(err);
			res.render('BaseBack/create', {
				pagename: "Article creation",
				authors: ['Adeline', 'Chris'],
				session: req.session,
				currentBlog: blogy,
				success: "Blog successfully updated"
			});
		});
	});
});

app.delete('/delete/:id_blog', function (req, res) {
	Blog.findOne({_id: req.params.id_blog}, function(err, removed) {
		removed.remove(function (err) {
			res.render('BaseBack/profil', {
				pagename: "Article creation",
				authors: ['Adeline', 'Chris'],
				session: req.session,
				success: "Blog successfully deleted"
			});
		});
	});
});

module.exports = app;