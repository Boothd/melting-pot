
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path'),
  Post = require('./Post'),
  fs = require('fs'),
  index;

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

//Include static content.
fs.readFile('sidebar.html', function(err, data) {
	if (err) {
		throw err;
	}
	index = data;
});

//locals for all views in the application
//app.locals(settings.template_defaults);

//middleware for common locals with request-specific values
app.use(function (req, res, next) {
    res.locals({
    	index:index
        // e.g. session: req.session
    });
    next();
});

var session = function(request, response, next) {
	response.locals({
    	index:index
        // e.g. session: req.session
    });
	//response.render('#', {index:index});
	
	console.log(index);
	
	next();
};



// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', session, routes.index);
app.get('/users', session, user.list);
//app.get('/blog', function(request, response) {
//    response.render('simple-blog', {});
//});

app.get('/blog', session, function(request, response) {

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
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
