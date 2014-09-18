exports.get = function(req, res){
	var actorId = req.params.actor_id;
	res.send({actor:actorFixtures[actorId - 1]});
};

actorFixtures = [
{
	id:1, firstName: "A", lastName: "B", image: "", bio: "",
		movies:[1, 2]
},
{
	id:2, firstName: "B", lastName: "C", image: "", bio: "",
		movies:[3]
}
];