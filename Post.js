// Require mongoose
var mongoose = require('mongoose');

try{
	
	//capture any errors on connection.
	mongoose.connection.on('error', function (err) {
		console.error("connection failed: "+err);
		inMemoryDB();
		});
	// Configure conenction URL (only needs to happen once per app)
	//mongoose.connect('mongodb://dbooth:password@ds039261.mongolab.com:39261/simple-blog');
	mongoose.connect('mongodb://test:test@ds039261.mongolab.com:39261/simple-blog');


	// Create a database schema for our Post object, which will describe both it's
	// data and it's behavior.
	var postSchema = mongoose.Schema({
	    title:String,
	    content:String
	});
	
	// Create a model object constructor that will have ODM functionality like .save()...
	var Post = mongoose.model('Post', postSchema);
	
	// Expose out model as the module interface
	module.exports = Post;
}
//NOTE: this type of catch will not catch mongoose connection errors!
catch(err)
{
	console.error("Error caught whilst calling mongo DB.")
	console.error(err);
}

var inMemoryDB = function(){
	// Create a database schema for our Post object, which will describe both it's
	// data and it's behavior.
	var postSchema = mongoose.Schema({
	    title:String,
	    content:String
	});
	
	var posts = '{ "posts" : [' +
	'{ "title":"First Post" , "content":"some text" },' +
	'{ "title":"Second Post" , "content":"Smith" },' +
	'{ "title":"Third Post" , "content":"Jones" } ]}';
	
	// Create a model object constructor that will have ODM functionality like .save()...
	var Post = mongoose.model('Post', postSchema);
	
	var p = new postSchema(posts);
	
	p.save( function(error, data){
	    if(error){
	        res.json(error);
	    }
	    else{
	        res.json(data);
	    }
	});
	
	// Expose out model as the module interface
	module.exports = Post;
}