var fs   = require('fs');
var path = require('path');

var Picture = {
	Profil: {
		get: function (id) {
			//if (fs.statSync(path.join(__dirname, '../assets/upload') + '/' + id).isFile()) {
			if (fs.existsSync(path.join(path.join(__dirname, '../assets/upload') + '/' + id))) {
				return 'assets/upload/id';
			} else {
				return 'assets/img/default.png';
			}
		},
	}
};

module.exports = Picture;