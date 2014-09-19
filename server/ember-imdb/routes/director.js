exports.list = function(req, res){

};

exports.get = function(req, res){
	var directorId = req.params.director_id;
	res.send({director:{firstName: "A", lastName: "B"}});
};

var directorFixtures = [
{
	id:1, firstName: "Wes", lastName: "Ball", image: "", bio: "",
		movies:[1]
},
{
	id:2, firstName: "Jonathan", lastName: "Liebesman", image: "", bio: "",
		movies:[2]
},
{
	id:3, firstName: "Christopher", lastName: "Nolan", image: "", bio: "",
		movies:[3]
},
{
	id:4, firstName: "Frank", lastName: "Darabont", image: "", bio: "",
		movies:[4]
},
{
	id:5, firstName: "Michael", lastName: "Bay", image: "", bio: "",
		movies:[5, 6]
},
{
	id:6, firstName: "James", lastName: "Gunn", image: "", bio: "",
		movies:[7]
},
{
	id:7, firstName: "Charles", lastName: "Martin Smith", image: "", bio: "",
		movies:[8]
},
{
	id:8, firstName: "Francis", lastName: "Lawrence", image: "", bio: "",
		movies:[9]
},
{
	id:9, firstName: "Eric", lastName: "Darnell", image: "", bio: "",
		movies:[10]
},
{
	id:10, firstName: "Peter", lastName: "Jackson", image: "", bio: "",
		movies:[11]
}
];