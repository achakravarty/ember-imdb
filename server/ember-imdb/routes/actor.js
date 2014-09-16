exports.list = function(req, res){

};

exports.get = function(req, res){
	var actorId = req.params.actor_id;
	if(actorId == 1){
		res.send({actor:{firstName: "A", lastName: "B"}});
	}
	else{
		res.send({actor:{firstName: "B", lastName: "C"}});	
	}
};