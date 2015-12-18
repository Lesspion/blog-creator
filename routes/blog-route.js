var express 	= require('express');
var app 		= express();
var User 		= require('../models/User');
var Blog 		= require('../models/Blog');
var Article     = require('../models/Article');
var isConnected = require('../personal_modules/TestConnected');
var Picture     = require('../personal_modules/Picture');
var Message     = require('../personal_modules/GetMessages');

app.post('/create', function (req, res) {
	if (!isConnected(req)) {
		res.redirect('/');
	}
	if (req.body.name != "undefined" && req.body.category !== "undefined" && req.session.id) {
		var blog = new Blog();
		blog.id_user = req.session._id;
		blog.name = req.body.name;
		blog.category = req.body.category;
		blog.createdAt = Date.now();
		blog.save(function (err) {
			if (err)
				res.end(err);
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
	if (!isConnected(req)) {
		res.redirect('/');
	}
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
	if (!isConnected(req)) {
		res.redirect('/');
	}
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
	if (!isConnected(req)) {
		res.redirect('/');
	}
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

app.get('/profil/:id_user?', function (req, res) {
	if (!isConnected(req)) {
		res.redirect('/');
	}
	var id_user;
	if (req.params.id_user) {
		id_user = req.params.id_user
	} else {
		id_user = req.session._id;
	}
	var mine = false;
	Blog.find({id_user: id_user}).exec(function (err, blogs) {
		var blogSend = [];
		for (var i = 0; i < blogs.length; i++) {
			var temp = {};
			temp._id = blogs[i]._id.toString();
			temp.name = blogs[i].name;
			blogSend.push(temp);
		}
		if (id_user == req.session._id) {
			mine = true;
		}
		User.findOne({_id: id_user}, function (err2, current) {
			Message.getAll(id_user, function (messages) {
				console.log("messages : ", messages);
				res.render('BaseBack/profil', {
					pagename: "Profil",
					authors: ['Adeline', 'Chris'],
					session: req.session,
					blogs: blogSend,
					mine: mine,
					current: current,
					messages: messages,
					profileOf: id_user
				});
			});
		});
	});
});

app.get('/blog/:author_name/:id_blog', function (req, res) {
	User.findOne({pseudo: req.params.author_name}, function (errUser, author) {
		Blog.findOne({_id: req.params.id_blog}, function (errBlog, blog) {
			Article.find({id_blog: req.params.id_blog}, function (errArticle, articles) {
				var articlesList = [];
				for (var i = 0; i < articles.length; i++) {
					var temp        = {};
					temp._id        = articles[i]._id;
					temp.createdAt  = articles[i].created_at;
					temp.title      = articles[i].title
					temp.content    = articles[i].text;
					temp.nbComments = 0;
					temp.picture    = Picture.Article.get(articles[i]._id);
					articlesList.push(temp);
				}
				req.session.picture = Picture.Profil.get(author._id);
				author.picture = Picture.Profil.get(author._id);
				author.name    = author.pseudo
				// req.session.articles = articlesList;
				res.render('Blog/home', {
					pagename: "Home",
					authors: ['Adeline', 'Chris'],
					session: req.session,
					articles: articlesList,
					author: author,
					curBlog: req.params.id_blog
				});
			});
		});
	});
});

module.exports = app;