/* GET users listing. */
exports.list = function(req, res){
  res.send({movies:movieFixtures});
};

exports.get = function(req, res){
	var movieId = req.params.movie_id;
	res.send({movie:movieFixtures[movieId - 1]});
};

movieFixtures = [
{
	id: 1, title: "A", rating: 2, releaseDate: new Date(2014, 7, 14), summary: "", image: "", trailer: "",
  		actors:[{id: 1, firstName: "A", lastName: "B", movies:[]}], 
  		director: {id: 1, firstName: "A", lastName: "B", movies:[]}
},
{
	id: 2, title: "B", rating: 4, releaseDate: new Date(2014, 8, 20), summary: "", image: "", trailer: "",
  		actors:[{id: 1, firstName: "A", lastName: "B", movies:[]}], 
  		director: {id: 2, firstName: "B", lastName: "C", movies:[]}
},
{
	id: 3, title: "C", rating: 5, releaseDate: new Date(2014, 7, 18), summary: "", image: "", trailer: "",
  		actors:[{id: 2, firstName: "B", lastName: "C", movies:[]}], 
  		director: {id: 1, firstName: "A", lastName: "B", movies:[]}
}
];
