var Blog = require('../models/Blog');

var fetchBlog = function (callback) {
	Blog.find({})
		.limit(10)
		.exec(function (err, blogs) {
			callback.call(this, blogs);
		});
}

module.exports = fetchBlog;