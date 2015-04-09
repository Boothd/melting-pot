exports.getConnection = function(){
	var mongoose = require('mongoose');

	// Configure conenction URL (only needs to happen once per app)
	mongoose.connect('mongodb://dbooth:password@ds039261.mongolab.com:39261/simple-blog');
	
	return mongoose;
};