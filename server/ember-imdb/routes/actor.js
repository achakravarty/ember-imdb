exports.get = function(req, res){
	var actorId = req.params.actor_id;
		res.send({actor:actorFixtures[0]});
};

var actorFixtures = [
{
	id:1, firstName: "A", lastName: "B",
	movies:[
		{id: 1, title: "A", rating: 2, releaseDate: new Date(2014, 7, 14),
  			actors:[{firstName: "A", lastName: "B"}], 
  			director: {firstName: "A", lastName: "B"}},
  		{id: 2, title: "B", rating: 4, releaseDate: new Date(2014, 8, 19),
  			actors:[{firstName: "A", lastName: "B"}], 
  			director: {firstName: "B", lastName: "C"}}	
		]
}
];