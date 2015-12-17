var testConnection = function (request, response) {
	if (request.session.connected == false) {
		response.redirect('/');
	}
};

module.exports = testConnection;