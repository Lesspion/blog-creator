var testConnection = function (request) {
	if (!request.session.connected || request.session == "undefined") {
		return false;
	} else {
		return true;
	}
};

module.exports = testConnection;