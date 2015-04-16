
/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./routes'),
	user = require('./routes/user'),
	http = require('http'),
	path = require('path'),
  	Blog = require('./node/Blog'),
	dataSource = require('./node/DataSourceDev'),
  	fs = require('fs'),
	TweetStreamer = require('./node/TweetStreamer');

var app = express();
var mongoose = dataSource.getConnection();
var Post = Blog.getPost(mongoose);

app.configure(function() {
	// all environments
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var tweetStream = TweetStreamer.streamTweets(server);



var session = function(request, response, next) {
	//useful place for adding stuff to the session.
	next();
};



// development only
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});
//production env
app.configure('production', function(){
  app.use(express.errorHandler()); 
});

app.get('/', session, routes.index);
app.get('/users', session, user.list);

// Render a form to enter a new post
app.get('/new', function(request, response) {
    response.render('new', {});
});

//render a twitter feed 
app.get('/tweet-stream', function(request, response) {
    response.render('tweet-stream', {});
});

// create a new blog post object
app.post('/create', function(request, response) {
	
    var post = new Post({
        title: request.body.title,
        content: request.body.content
    });

    // TODO: Save the model
    post.save(function(err, model) {
        if (err) {
            response.send(500, 'There was an error - tough luck.');
        }
        else {
            response.redirect('/');
        }
    });
});

//Render the blog page.
app.get('/blog', session, function(request, response) {

	if (typeof Post !== "undefined") {
    Post.find(function(err, posts) {
        if (err) {
            response.send(500, 'There was an error - tough luck.');
        }
        else {
            response.render('simple-blog', {
                posts:posts
            });
        }
    });
}
	else{
		console.error("Post is undefined? Sounds like a bug to me.");
	}
});
