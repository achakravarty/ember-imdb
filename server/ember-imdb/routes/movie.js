/* GET users listing. */
exports.list = function(req, res){
  res.send({movies:movieFixtures});
};

exports.get = function(req, res){
	var movieId = req.params.movie_id;
	movieFixtures[movieId - 1] = req.body.movie;
	res.send({movie:movieFixtures[movieId - 1]});
};

exports.update = function(req, res){
	var movieId = req.params.movie_id;
	res.send({movie:movieFixtures[movieId - 1]});
};

movieFixtures = [
{
	id: 1, title: "A", rating: 2, releaseDate: new Date(2014, 7, 14), summary: "", image: "", trailer: "",
  		actors:[1], 
  		director: 1
},
{
	id: 2, title: "B", rating: 4, releaseDate: new Date(2014, 8, 20), summary: "", image: "", trailer: "",
  		actors:[1], 
  		director: 2
},
{
	id: 3, title: "C", rating: 5, releaseDate: new Date(2014, 7, 18), summary: "", image: "", trailer: "",
  		actors:[2], 
  		director: 1
}
];
