/* GET users listing. */
exports.list = function(req, res){
  res.send({movies:movieFixtures});
};

exports.get = function(req, res){
	var actorId = req.params.actor_id;
	res.send({movie:movieFixtures[0]});
};

var movieFixtures = [
{
	id: 1, title: "A", rating: 2, releaseDate: new Date(2014, 7, 14),
  		actors:[{firstName: "A", lastName: "B"}], 
  		director: {firstName: "A", lastName: "B"}
},
{
	id: 2, title: "B", rating: 4, releaseDate: new Date(2014, 8, 20),
  		actors:[{firstName: "A", lastName: "B"}], 
  		director: {firstName: "B", lastName: "C"}
},
{
	id: 3, title: "C", rating: 5, releaseDate: new Date(2014, 7, 18),
  		actors:[{firstName: "B", lastName: "C"}], 
  		director: {firstName: "A", lastName: "B"}
}
];
