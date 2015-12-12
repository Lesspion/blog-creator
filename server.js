var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var swig 	   = require('swig');
var subdomain  = require('subdomain');

mongoose.connect('mongodb://localhost:27017/blogcreator');

app.use('/assets', express.static(__dirname + '/assets'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', false);
swig.setDefaults({ cache: false });

app.use(subdomain({
	base: 'blog-creator.prod'
}));

app.get('/subdomain/www', function (req, res) {
	res.render('index', {
		pagename: "HomePage",
		authors: ['Adeline', 'Chris']
	});
});

app.get('/subdomain/:login', function (req, res) {
	res.end(req.headers.host);
});

app.get('/', function (req, res) {
	res.render('index', {
		pagename: "HomePage",
		authors: ['Adeline', 'Chris']
	});
});

app.get('/blog', function (req, res) {
	res.render('Blog/home', {
		pagename: "Home",
		authors: ['Adeline', 'Chris']
	});
});

app.get('/blog/article', function (req, res) {
	res.render('Blog/detailArticle', {
		pagename: "detailArticle",
		authors: ['Adeline', 'Chris']
	});
});

app.get('/profil', function (req, res) {
	res.render('BaseBack/profil', {
		pagename: "Profil",
		authors: ['Adeline', 'Chris']
	});
});

app.get('/accueil', function (req, res) {
	res.render('BaseBack/accueil', {
		pagename: "Accueil log",
		authors: ['Adeline', 'Chris']
	});
});

app.get('/create', function (req, res) {
	res.render('BaseBack/create', {
		pagename: "Article creation",
		authors: ['Adeline', 'Chris']
	});
});

app.get('/articles', function (req, res) {
	res.render('BaseBack/articles', {
		pagename: "Mes articles",
		authors: ['Adeline', 'Chris']
	});
});

module.exports = app;