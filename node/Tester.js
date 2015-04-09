var dataSource = require('./DataSourceDev');
var Blog = require('./Blog');

console.info("Calling getConnection");
var mongoose = dataSource.getConnection();
console.info("Calling getPosts");
var Post  = Blog.getPost(mongoose);

Post.find(function(err, posts) {
        if (err) {
			console.trace(err);
		}
        else {
            console.info(posts);
            }
});

