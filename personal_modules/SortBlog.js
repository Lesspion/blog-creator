var User = require('../models/User');
var Picture = require('./Picture');

var sortBlog = function (blogsArray) {
	var finalBlogs = [];
	for (var i = 0; i < blogsArray.length; i++) {
		var temp = {};
		temp._id = blogsArray[i]._id;
		temp.name = blogsArray[i].name;
		temp.category = blogsArray[i].category;
		temp.createdAt = "xx/xx/xxxx";
		temp.author = blogsArray[i].id_user.pseudo;
		temp.author_id = blogsArray[i].id_user._id;
		temp.picture = Picture.Profil.get(blogsArray[i].id_user);
		finalBlogs.push(temp);
	}
	return finalBlogs;
};

module.exports = sortBlog;