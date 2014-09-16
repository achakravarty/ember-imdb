/* GET users listing. */
exports.list = function(req, res){
  res.send({movies:[{title: "A", rating: 5, actors:[1], director: 1}, 
  	{title: "B", rating: 8, actors:[2], director: 1}, 
  	{title: "C", rating: 10, actors:[1], director: 1}]});
};

exports.get = function(req, res){
	var actorId = req.params.actor_id;
	res.send({movie:{title: "A", rating: 5, actors:[]}});
};
