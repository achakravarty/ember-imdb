exports.list = function(req, res){

};

exports.get = function(req, res){
	var directorId = req.params.director_id;
	res.send({director:{firstName: "A", lastName: "B"}});
};