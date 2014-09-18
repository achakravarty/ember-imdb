exports.get = function(req, res){
	var actorId = req.params.actor_id;
	res.send({actor:actorFixtures[actorId - 1]});
};

actorFixtures = [
{
	id:1, firstName: "A", lastName: "B", image: "", bio: "",
		movies:[
			{id: 1, title: "A", rating: 2, releaseDate: new Date(2014, 7, 14),
				actors:[], 
				director: {movies: []}},
			{id: 2, title: "B", rating: 4, releaseDate: new Date(2014, 8, 19),
				actors:[], 
				director: {movies: []}}
		]
}
];