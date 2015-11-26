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
		pagename: "Test example",
		authors: ['Adeline', 'Chris', 'Ourdia', 'Nelly', "Soso"]
	});
});

app.listen(port);
console.log('Magic happens on port ' + port);
