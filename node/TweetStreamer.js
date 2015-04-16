//ref to https://github.com/AvianFlu/ntwitter/issues/110 to fix bug	
module.exports.streamTweets = function(server) {

	// Set up socket.io
	var io = require('socket.io').listen(server);

	// Handle socket traffic
	io.sockets.on('connection', function(socket) {

		socket.on('tweets', function() {
			search();
		});

		var search = function() {

			var twitter = require('ntwitter');

			var twit = new twitter({
				consumer_key: "7mxhEcnEpHbCEZL2fUoJ8cld3",
				consumer_secret: "APnoPquFx4YjIZR32vpfrydiGi05IBlpqc3cB132rv2oes9WO0",
				access_token_key: "861737564-7RydBknodZez0OBL9GwcmzFVsZLZWbS9Aywf1goe",
				access_token_secret: "vfVJfAVfn2yEyl418n9SlSl22YniuywNrtzwzgMSah4l0"
			});

			twit.search('nodejs OR #javascript', {}, function(err, data) {
				if (err) {
					console.log('Twitter search failed!');
					console.error(err);
				}

				if (data !== undefined) {
					socket.emit('tweets', data);
				}
			});
		};
	});
};