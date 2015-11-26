var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var swig 	   = require('swig');
var forceDomain = require('forcedomain');

mongoose.connect('mongodb://localhost:27017/blog');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', false);
swig.setDefaults({ cache: false });


var port = process.env.PORT || 3000;

//app.use('/', );

app.get('/', function (req, res) {
	res.render('example', {
		pagename: "Test example",
		authors: ['Adeline', 'Chris', 'Ourdia', 'Nelly', "Soso"]
	});
});

app.get('/test', function (req, res) {
	res.send('boulou');
});

// app.use(forceDomain({
//   hostname: 'www.boulouhidden.prod',
//   port: '3000'
// }));

//app.listen(port);
console.log('Magic happens on port ' + port);

module.exports = app;