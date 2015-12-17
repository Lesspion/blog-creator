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
		temp.picture = Picture.Profil.get(blogsArray[i].id_user);
		// User.findOne({_id: blogsArray[i].id_user}, function (err, user) {
		// 	temp.author = user.pseudo;
		// 	temp.picture = Picture.Profil.get(user._id);
		// });
		finalBlogs.push(temp);
	}
	return finalBlogs;
};

module.exports = sortBlog;