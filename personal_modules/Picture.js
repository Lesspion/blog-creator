var fs = require('fs');

var Picture = {
	Profil: {
		get: function (id) {
			if (fs.statSync('../assets/upload/' + id).isFile()) {
				return 'assets/upload/id';
			} else {
				return 'assets/img/default.png';
			}
		},
	}
};

module.exports = Picture;