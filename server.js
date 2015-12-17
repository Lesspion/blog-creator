var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var swig 	   = require('swig');
var subdomain  = require('subdomain');
var userRoute  = require('./routes/user-route');
var blogRoute  = require('./routes/blog-route');
var articleRoute = require('./routes/article-route');
var session    = require('express-session');
var fetchBlog  = require('./personal_modules/Blog');
var Picture    = require('./personal_modules/Picture');
var Env        = require('./settings/env');
var sortBlog   = require('./personal_modules/SortBlog');

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
	req.session.touch();
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

app.get('/blog', function (req, res) {
	res.render('Blog/home', {
		pagename: "Home",
		authors: ['Adeline', 'Chris'],
		session: req.session
	});
});

app.get('/blog/article', function (req, res) {
	res.render('Blog/detailArticle', {
		pagename: "detailArticle",
		authors: ['Adeline', 'Chris'],
		session: req.session
	});
});

// app.get('/profil', function (req, res) {
// 	res.render('BaseBack/profil', {
// 		pagename: "Profil",
// 		authors: ['Adeline', 'Chris'],
// 		session: req.session
// 	});
// });

app.get('/accueil', function (req, res) {
	console.log("_id : ", req.session._id);
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
