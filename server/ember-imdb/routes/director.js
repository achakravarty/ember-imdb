exports.list = function(req, res){

};

exports.get = function(req, res){
	var directorId = req.params.director_id;
	res.send({director:directorFixtures[directorId - 1]});
};

var directorFixtures = [
{
	id:1, firstName: "A", lastName: "B", image: "", bio: "",
		movies:[1, 3]
},
{
	id:2, firstName: "B", lastName: "C", image: "", bio: "",
		movies:[2]
}
];