/* GET users listing. */
exports.list = function(req, res){
  res.send({movies:[
  	{id: 1, title: "A", rating: 2, 
  		actors:[{firstName: "A", lastName: "B"}], 
  		director: {firstName: "A", lastName: "B"},
  		releaseDate: new Date(2014, 7, 14)}, 
  	{id: 2, title: "B", rating: 4, 
  		actors:[{firstName: "B", lastName: "C"}], 
  		director: {firstName: "A", lastName: "C"},
  		releaseDate: new Date(2014, 8, 19)}, 
  	{id: 3, title: "C", rating: 5, 
  		actors:[{firstName: "A", lastName: "D"}], 
  		director: {firstName: "A", lastName: "X"},
  		releaseDate: new Date(2014, 7, 18)}
  	]});
};

exports.get = function(req, res){
	var actorId = req.params.actor_id;
	res.send({movie:{id: 2, title: "B", rating: 4, 
  		actors:[{firstName: "B", lastName: "C"}], 
  		director: {firstName: "A", lastName: "C"},
  		releaseDate: new Date(2014, 8, 18)}});
};
