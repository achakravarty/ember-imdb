exports.list = function(req, res){
	res.send({watchlist: watchList});
};

exports.add = function(req, res){
	var movieId = JSON.parse(req.body.movie).id;
	watchList.push(movieFixtures[movieId - 1]);
	res.send({watchlist: watchList});
};

exports.remove = function(req, res){
	var movieId = JSON.parse(req.body.movie).id;
	var movieIndex = watchList.indexOf(movieFixtures[movieId - 1]);
	watchList.splice(movieIndex, 1);
	res.send({watchlist: watchList});
};

var watchList = [];