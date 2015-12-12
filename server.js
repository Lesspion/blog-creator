var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var swig 	   = require('swig');
var subdomain  = require('subdomain');

mongoose.connect('mongodb://localhost:27017/blogcreator');

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
	res.send('/')
});

app.get('/subdomain/:login', function (req, res) {
	res.end(req.headers.host);
});

app.get('/', function (req, res) {
	res.render('example', {
		pagename: "Test example",
		authors: ['Adeline', 'Chris', 'Ourdia', 'Nelly', "Soso"]
	});
});

module.exports = app;