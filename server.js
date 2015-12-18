var express      = require('express');
var app          = express();
var bodyParser   = require('body-parser');
var mongoose     = require('mongoose');
var swig 	     = require('swig');
var subdomain    = require('subdomain');
var userRoute    = require('./routes/user-route');
var blogRoute    = require('./routes/blog-route');
var messageRoute = require('./routes/message-route');
var articleRoute = require('./routes/article-route');
var session      = require('express-session');
var fetchBlog    = require('./personal_modules/Blog');
var Picture      = require('./personal_modules/Picture');
var Env          = require('./settings/env');
var sortBlog     = require('./personal_modules/SortBlog');
var User         = require('./models/User');
var Article      = require('./models/Article');
var Blog         = require('./models/Blog');

mongoose.connect('mongodb://localhost:27017/blogcreator');

app.use('/assets', express.static(__dirname + '/assets'));

app.use(session(Env.Session.Secret));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', false);
swig.setDefaults({ cache: false });

swig.setFilter('toString', function (input) {
	return input.toString();
});

app.use(subdomain({
	base: 'blog-creator.prod'
}));

app.use(function (req, res, next) {
	res.locals.base_URI = Env.Base_URI;
	next();
});

app.get('/subdomain/www', function (req, res) {
	fetchBlog(function (blogs) {
		res.render('index', {
			pagename: "HomePage",
			authors: ['Adeline', 'Chris'],
			blogs: blogs
		});
	});
});

app.get('/subdomain/:login', function (req, res) {
	res.end(req.headers.host);
});

app.get('/', function (req, res) {
	// req.session = {};
	req.session.connected = false;
	fetchBlog(function (blogs) {
		res.render('index', {
			pagename: "HomePage",
			authors: ['Adeline', 'Chris'],
			blogs: sortBlog(blogs),
			session: req.session
		});
	});
});

app.use('/', userRoute);
app.use('/', blogRoute);
app.use('/', articleRoute);
app.use('/', messageRoute);

app.get('/accueil', function (req, res) {
	req.session.picture = Picture.Profil.get(req.session._id);
	fetchBlog(function (blogs) {
		res.render('BaseBack/accueil', {
			pagename: "Accueil log",
			authors: ['Adeline', 'Chris'],
			blogs: sortBlog(blogs),
			session: req.session
		});
	});
});

app.get('/blog/:author_name/:id_blog/:id_article', function (req, res) {
	User.findOne({pseudo: req.params.author_name}, function (errUser, author) {
		Blog.findOne({_id: req.params.id_blog}, function (errBlog, blog) {
			Article.findOne({id_blog: req.params.id_blog}, function (errArticle, articles) {
				var temp        = {};
				temp._id        = articles._id;
				temp.createdAt  = articles.created_at;
				temp.title      = articles.title
				temp.content    = articles.text;
				temp.nbComments = 0;
				temp.picture    = Picture.Article.get(articles._id);
				req.session.picture = Picture.Profil.get(author._id);
				author.picture = Picture.Profil.get(author._id);
				author.name    = author.pseudo
				res.render('Blog/detailArticle', {
					pagename: "detailArticle",
					authors: ['Adeline', 'Chris'],
					session: req.session,
					article: temp,
					author: author,
					curBlog: req.params.id_blog
				});
			});
		});
	});
});

app.get('/create', function (req, res) {
	res.render('BaseBack/create', {
		pagename: "Article creation",
		authors: ['Adeline', 'Chris'],
		session: req.session,
		createBlog: true
	});
});

app.get('/articles', function (req, res) {
	res.render('BaseBack/articles', {
		pagename: "Mes articles",
		authors: ['Adeline', 'Chris'],
		session: req.session
	});
});

module.exports = app;
