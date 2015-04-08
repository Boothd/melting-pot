
/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./routes'),
	user = require('./routes/user'),
	http = require('http'),
	path = require('path'),
  	Post = require('./Post'),
  	fs = require('fs');

var app = express();

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

var session = function(request, response, next) {
	//useful place for adding stuff to the session.
	next();
};



// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', session, routes.index);
app.get('/users', session, user.list);

// Render a form to enter a new post
app.get('/new', function(request, response) {
    response.render('new', {});
});

// create a new blog post object
app.post('/create', function(request, response) {
    // TODO: Create and save a Post model
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

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
