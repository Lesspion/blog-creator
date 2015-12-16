var express 	= require('express');
var app 		= express();
var User 		= require('../models/User');
var Blog 		= require('../models/Blog');
var Article 	= require('../models/Article');

app.get('/create/article/:id_blog', function (req, res) {
	res.render('BaseBack/create', {
		pagename: "Article creation",
		authors: ['Adeline', 'Chris'],
		session: req.session,
		create: "article"
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
		if (req.files) {
			//install multer plugin https://github.com/expressjs/multer
		}
		article.save(function (err) {
			if (err)
				res.end(err)
			res.render('', {
				pagename: '',
				authors: ['Adeline', 'Chris']
			});
		});
	}
});

app.get('/edit/article/:id_article', function (req, res) {
	Article.findOne({_id: req.params.id_article}, function (err, article) {
		res.render('BaseBack/profil', {
			pagename: "Article creation",
			authors: ['Adeline', 'Chris'],
			session: req.session,
			create: "article",
			article: article
		});
	});
});

app.post('/edit/article/:id_article', function (req, res) {
	Article.findOne({_id: req.params.id_article}, function (err, article) {
		if (req.body.content && req.body.title) {
			article.title = req.body.title;
			article.text  = req.body.content;
			article.created_at = Date.now();
			article.updated_at = Date.now();
			if (req.files) {
				//install multer plugin https://github.com/expressjs/multer
			}
			article.save(function (err) {
				if (err)
					res.end(err)
				res.render('', {
					pagename: '',
					authors: ['Adeline', 'Chris']
				});
			});
		}
	});
});

app.delete('/article/:id_blog/:id_article', function (req, res) {
	Article.findOne({_id: req.params.id_article}, function (err, articleToRemove) {
		articleToRemove.remove(function (err) {
			res.render('BaseBack/profil', {
				pagename: "Article creation",
				authors: ['Adeline', 'Chris'],
				session: req.session,
				success: "article successfully deleted"
			});
		});
	});
});

app.get('/article/:id_blog/:id_article', function (req, res) {
	Article.find({_id: req.params.id_article}, function (err, article) {
		// return article with a view;
	});
});

module.exports = app;