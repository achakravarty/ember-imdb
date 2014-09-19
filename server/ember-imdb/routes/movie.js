/* GET users listing. */
exports.list = function(req, res){
  res.send({movies:movieFixtures});
};

exports.get = function(req, res){
	var movieId = req.params.movie_id;
	res.send({movie:movieFixtures[movieId - 1]});
};

movieFixtures = [
{
	id: 1, title: "The Maze Runner", rating: 8, releaseDate: new Date(2014, 8, 19), 
	summary: "Thomas is deposited in a community of boys after his memory is erased, soon learning they're all trapped in a maze that will require him to join forces with fellow 'runners' for a shot at escape.", 
	image: "http://ia.media-imdb.com/images/M/MV5BMjUyNTA3MTAyM15BMl5BanBnXkFtZTgwOTEyMTkyMjE@._V1__SX1303_SY615_.jpg", trailer: "",
  		actors:[1], 
  		director: 1
},
{
	id: 2, title: "Teenage Mutant Ninja Turtles", rating: 6, releaseDate: new Date(2014, 7, 8), 
	summary: "A group of mutated warriors face off against an evil kingpin who wants to take over New York.", 
	image: "http://ia.media-imdb.com/images/M/MV5BNjUzODQ5MDY5NV5BMl5BanBnXkFtZTgwOTc1NzcyMjE@._V1__SX1303_SY615_.jpg", trailer: "",
  		actors:[2, 3], 
  		director: 2
},
{
	id: 3, title: "The Dark Knight", rating: 9, releaseDate: new Date(2008, 6, 18), 
	summary: "When Batman, Gordon and Harvey Dent launch an assault on the mob, they let the clown out of the box, the Joker, bent on turning Gotham on itself and bringing any heroes down to his level.", 
	image: "http://ia.media-imdb.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1__SX1303_SY615_.jpg", trailer: "",
  		actors:[3, 4, 5], 
  		director: 3
},
{
	id: 4, title: "The Shawshank Redemption", rating: 9, releaseDate: new Date(1994, 9, 14), 
	summary: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.", 
	image: "http://ia.media-imdb.com/images/M/MV5BODU4MjU4NjIwNl5BMl5BanBnXkFtZTgwMDU2MjEyMDE@._V1__SX1303_SY615_.jpg", trailer: "",
  		actors:[6], 
  		director: 4
},
{
	id: 5, title: "Transformers", rating: 7, releaseDate: new Date(2007, 6, 3), 
	summary: "An ancient struggle between two Cybertronian races, the heroic Autobots and the evil Decepticons, comes to Earth, with a clue to the ultimate power held by a teenager.", 
	image: "http://ia.media-imdb.com/images/M/MV5BMTQwNjU5MzUzNl5BMl5BanBnXkFtZTYwMzc1MTI3._V1__SX1303_SY615_.jpg", trailer: "",
  		actors:[2], 
  		director: 5
},
{
	id: 6, title: "Transformers: Revenge of the Fallen", rating: 6, releaseDate: new Date(2009, 5, 24), 
	summary: "Sam Witwicky leaves the Autobots behind for a normal life. But when his mind is filled with cryptic symbols, the Decepticons target him and he is dragged back into the Transformers' war.", 
	image: "http://ia.media-imdb.com/images/M/MV5BNjk4OTczOTk0NF5BMl5BanBnXkFtZTcwNjQ0NzMzMw@@._V1__SX1303_SY615_.jpg", trailer: "",
  		actors:[2], 
  		director: 5
},
{
	id: 7, title: "Guardians of the Galaxy", rating: 9, releaseDate: new Date(2014, 7, 1), 
	summary: "A group of space criminals must work together to stop a fanatic from destroying the galaxy.", 
	image: "http://ia.media-imdb.com/images/M/MV5BMTAwMjU5OTgxNjZeQTJeQWpwZ15BbWU4MDUxNDYxODEx._V1__SX1303_SY615_.jpg", trailer: "",
  		actors:[7], 
  		director: 6
},
{
	id: 8, title: "Dolphin Tale 2", rating: 7, releaseDate: new Date(2014, 8, 12), 
	summary: "The team of people who saved Winter's life reassemble in the wake of her surrogate mother's passing in order to find her a companion so she can remain at the Clearwater Marine Hospital.", 
	image: "http://ia.media-imdb.com/images/M/MV5BMjA5NzE4ODQwMV5BMl5BanBnXkFtZTgwMTc4OTA5MTE@._V1__SX1303_SY615_.jpg", trailer: "",
  		actors:[6], 
  		director: 7
},
{
	id: 9, title: "The Hunger Games: Mockingjay - Part 1", rating: 0, releaseDate: new Date(2014, 10, 21), 
	summary: "Katniss Everdeen is in District 13 after she shatters the games forever. Under the leadership of President Coin and the advice of her trusted friends, Katniss spreads her wings as she fights to save Peeta and a nation moved by her courage.", 
	image: "http://ia.media-imdb.com/images/M/MV5BMTcxNDI2NDAzNl5BMl5BanBnXkFtZTgwODM3MTc2MjE@._V1__SX1303_SY615_.jpg", trailer: "",
  		actors:[8], 
  		director: 8
},
{
	id: 10, title: "Penguins of Madagascar", rating: 0, releaseDate: new Date(2014, 10, 26), 
	summary: "Super spy teams aren't born...they're hatched. Discover the secrets of the greatest and most hilarious covert birds in the global espionage biz: Skipper, Kowalski, Rico and Private. ", 
	image: "http://ia.media-imdb.com/images/M/MV5BMTEyMDg4MDU4MjdeQTJeQWpwZ15BbWU4MDQyOTc3MjIx._V1__SX1303_SY615_.jpg", trailer: "",
  		actors:[9], 
  		director: 9
},
{
	id: 11, title: "The Hobbit: The Battle of Five Armies", rating: 0, releaseDate: new Date(2014, 11, 17), 
	summary: "The Company of Thorin has reached Smaug's lair; but can Bilbo and the Dwarves reclaim Erebor and the treasure? And, if so, can they hold on to it?", 
	image: "http://ia.media-imdb.com/images/M/MV5BODAzMDgxMDc1MF5BMl5BanBnXkFtZTgwMTI0OTAzMjE@._V1__SX1303_SY615_.jpg", trailer: "",
  		actors:[10, 11], 
  		director: 10
}
];
