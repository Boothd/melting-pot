// Require mongoose
var mongoose = require('mongoose');

try {
		// Configure conenction URL (only needs to happen once per app)
		mongoose.connect('mongodb://dbooth:password@ds039261.mongolab.com:39261/simple-blog');
		//mongoose.connect('mongodb://test:test@ds039261.mongolab.com:39261/simple-blog');

			// Create a database schema for our Post object, which will describe
			// both it's
			// data and it's behavior.
			var postSchema = mongoose.Schema({
				title : String,
				content : String
			});

			// Create a model object constructor that will have ODM functionality
			// like .save()...
			var Post = mongoose.model('Post', postSchema);

			// Expose out model as the module interface
			module.exports = Post;

		// capture any errors on connection.
		mongoose.connection.on('error', function(err) {
			console.error("connection failed: " + err);
			//	var inMemoryDB = new inMemoryDB();
			//inMemoryDB.create();
	});

	mongoose.connection.on('open', function() {
		//this methods returns too late to be useful for the current
		//design of this app.
	});

}
catch (err) {
	// NOTE: this type of catch will not catch mongoose connection errors!
	console.error("Error caught whilst calling mongo DB.");
	console.error(err);
}


//Doesn't work at the mo.
function inMemoryDB() {
	this.create = function() {

		var posts = '{ "posts" : [' +
			'{ "title":"First Post" , "content":"some text" },' +
			'{ "title":"Second Post" , "content":"Smith" },' +
			'{ "title":"Third Post" , "content":"Jones" } ]}';

		Post = function() {
			var posts = '{ "posts" : [' +
				'{ "title":"First Post" , "content":"some text" },' +
				'{ "title":"Second Post" , "content":"Smith" },' +
				'{ "title":"Third Post" , "content":"Jones" } ]}';

			this.find = function() {
				return posts;
			};
		};

		// Expose out model as the module interface
		module.exports = Post;
	};
}