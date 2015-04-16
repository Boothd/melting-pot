var PropertiesReader = require('properties-reader');

module.exports.getConnection = function(){
	console.info("inside getConnection");
	
	var properties = PropertiesReader('./properties/datasource.properties');
	
	var mongoose = require('mongoose');

	// Configure conenction URL (only needs to happen once per app)
	//mongoose.connect('mongodb://dbooth:password@ds039261.mongolab.com:39261/simple-blog');
	mongoose.connect(properties.get("mongodb.datasource"));
	
	return mongoose;
};