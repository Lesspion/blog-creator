var express 	= require('express');
var app 		= express();
var User 		= require('../models/User');
var Blog 		= require('../models/Blog');
var Article 	= require('../models/Article');
var Commentaire = require('../models/Commentaire');
var isConnected = require('../personal_modules/TestConnected');

app.use(function (req, res, next) {
	if (isConnected(req)) {
		next();
	} else {
		res.redirect('/');
	}
});

app.get('/create/article/:id_blog', function (req, res) {
	res.render('BaseBack/create', {
		pagename: "Article creation",
		authors: ['Adeline', 'Chris'],
		session: req.session,
		createArticle: true
	});
});

app.post('/create/article/:id_blog', function (req, res) {
	if (req.body.content && req.body.title) {
		var article   = new Article();
		article.id_blog  	= req.params.id_blog; 
		article.title 		= req.body.title;
		article.text  		= req.body.content;
		article.created_at  = Date.now();
		article.updated_at  = Date.now();
		console.log('I\'m here !');
		if (req.files) {
			//install multer plugin https://github.com/expressjs/multer
		}
		article.save(function (err) {
			if (err)
				res.end(err)
			console.log('here !!!!!');
			res.redirect('/articles/' + req.params.id_blog);
		});
	}
});

app.get('/edit/article/:id_article', function (req, res) {
	Article.findOne({_id: req.params.id_article}, function (err, article) {
		res.render('BaseBack/create', {
			pagename: "Article creation",
			authors: ['Adeline', 'Chris'],
			session: req.session,
			createArticle: true,
			article: article
		});
	});
});

app.post('/edit/article/:id_article', function (req, res) {
	Article.findOne({_id: req.params.id_article}, function (err, article) {
		if (req.body.content || req.body.title) {
			
			if (req.body.title) {
				article.title = req.body.title;
			}
			if (req.body.content) {
				article.text  = req.body.content;
			}
			article.updated_at = Date.now();
			if (req.files) {
				//install multer plugin https://github.com/expressjs/multer
			}
			article.save(function (err) {
				if (err)
					res.end(err)
				res.redirect('/profil');
			});
		} else {
			res.redirect('/edit/article/' + req.params.id_article);
		}
	});
});

app.delete('/article/:id_blog/:id_article', function (req, res) {
	console.log('hey !');
	Article.findOne({_id: req.params.id_article}, function (err, articleToRemove) {
		articleToRemove.remove(function (err) {
			res.redirect('/profil');
		});
	});
});

app.get('/article/:id_blog/:id_article', function (req, res) {
	Article.find({_id: req.params.id_article}, function (err, article) {
		// return article with a view;
	});
});

app.get('/articles/:id_blog', function (req, res) {
	Article.find({id_blog: req.params.id_blog}, function (err, articles) {
		var articlesList = [];
		for (var i = 0; i < articles.length; i++) {
			var temp       = {};
			temp._id 	   = articles[i]._id.toString();
			temp.picture   = articles[i].pictures || "";
			temp.title     = articles[i].title;
			temp.content   = articles[i].text;
			temp.createdAt = articles[i].created_at;
			temp.nbComments = articles[i].commentaires.length;
			articlesList.push(temp);
		}
		res.render('BaseBack/articles', {
			pagename: "Mes articles",
			authors: ['Adeline', 'Chris'],
			session: req.session,
			articles: articlesList,
			actualBlog: req.params.id_blog
		});
	});
});

module.exports = app;