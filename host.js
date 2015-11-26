var port = process.env.PORT || 8000;
var express    = require('express');
var app        = express();
var server = require('./server');
var vhost = require('vhost');
var evh = require('express-vhost');
console.log(server);
//app.use(vhost('*.example.prod', server)); // Serves all subdomains via Redirect app
app.use(vhost('blog-creator.prod', server)); // Serves top level domain via Main server app

//app.use(evh.vhost(app.enabled('trusted proxy')));
app.listen(80);

//evh.register('example.prod', server.app);

console.log('Magic happens on port ' + port);