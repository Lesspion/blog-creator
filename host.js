var port = 80;
var express    = require('express');
var app        = express();
var server = require('./server');
var vhost = require('vhost');

app.use(vhost('blog-creator.prod', server));
app.use(vhost('*.blog-creator.prod', server));
//app.use(evh.vhost(app.enabled('trusted proxy')));
app.listen(port);

console.log('Magic happens on port ' + port);