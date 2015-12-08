var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var swig 	   = require('swig');

mongoose.connect('mongodb://localhost:27017/blog');

app.use('/assets', express.static(__dirname + '/assets'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', false);
swig.setDefaults({ cache: false });


var port = 1337;

//app.use('/', );

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
})

app.listen(port);
console.log('Magic happens on port ' + port);
