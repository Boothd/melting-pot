// Require mongoose
var mongoose = require('mongoose');

try {

//	var inMemoryDB = new inMemoryDB();
//	inMemoryDB.create();

	// Configure conenction URL (only needs to happen once per app)
	mongoose.connect('mongodb://dbooth:password@ds039261.mongolab.com:39261/simple-blog');
	//mongoose.connect('mongodb://test:test@ds039261.mongolab.com:39261/simple-blog');

	// capture any errors on connection.
	mongoose.connection.on('error', function(err) {
		console.error("connection failed: " + err);
		//inMemoryDB.create();
	});

	mongoose.connection.on('open', function() {
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
	});

}
// NOTE: this type of catch will not catch mongoose connection errors!
catch (err) {
	console.error("Error caught whilst calling mongo DB.")
	console.error(err);
}

function inMemoryDB() {
	this.create = function() {

		var posts = '{ "posts" : ['
				+ '{ "title":"First Post" , "content":"some text" },'
				+ '{ "title":"Second Post" , "content":"Smith" },'
				+ '{ "title":"Third Post" , "content":"Jones" } ]}';

		Post = new function() {
			var posts = '{ "posts" : ['
					+ '{ "title":"First Post" , "content":"some text" },'
					+ '{ "title":"Second Post" , "content":"Smith" },'
					+ '{ "title":"Third Post" , "content":"Jones" } ]}';

			this.find = function() {
				return posts;
			}
		}

		// Expose out model as the module interface
		module.exports = Post;
	}
}