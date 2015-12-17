var Env = {
	Base_URI: "http://blog-creator.prod",
	Mongoose: 'mongodb://localhost:27017/blogcreator',
	Session: {
		Secret: {
			secret: 'javascriptIsAwesome'
		}
	},
	Folder: {
		Views: "",
		Static: ""
	},
	ENV: "prod|dev"
};

module.exports = Env;