exports.list = function(req, res){
	res.send({watchlist: [{movies: watchList}]});
};

exports.add = function(req, res){
	var movie = JSON.parse(req.body.movie);
	var matchingMovie = movieFixtures.filter(function(movieFixture){
		return movieFixture.title == movie.title;
	})[0];
	watchList.push(matchingMovie);
	res.send({watchlist: [{movies: watchList}]});
};

exports.remove = function(req, res){
	var movieId = JSON.parse(req.body.movie).id;
	var matchingMovie = movieFixtures.filter(function(movieFixture){
		return movieFixture.title == movie.title;
	})[0];
	var movieIndex = watchList.indexOf(matchingMovie);
	watchList.splice(movieIndex, 1);
	res.send({watchlist: [{movies: watchList}]});	
};

var watchList = [];