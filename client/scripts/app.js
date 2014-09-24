App = Ember.Application.create();

App.Router.map(function() {
	this.resource("movie", { path: "/movie/:movie_id" });
	this.resource("actor", { path: "/actor/:actor_id" });
});

DS.RESTAdapter.reopen({
	host: 'http://localhost:3000'
})

App.ApplicationAdapter = DS.FixtureAdapter;

var attr = DS.attr;

App.Movie = DS.Model.extend({
	title: attr('string'),
	summary: attr('string'),
	releaseDate: attr('date'),
	releaseYear: function(){
		return new Date(this.get('releaseDate')).getFullYear();
	}.property('releaseDate'),
	actors: DS.hasMany('actor', {async: true}),
	director: DS.belongsTo('director', {async: true}),
	rating: attr('number'),
	image: attr('string'),
	trailer: attr('string')
});

App.Person = DS.Model.extend({
	firstName: attr('string'),
	lastName: attr('string'),
	bio: attr('string'),
	image: attr('string'),
	fullName: function(){
		return this.get('firstName') + " " + this.get('lastName');
	}.property('firstName', 'lastName'),
	movies: DS.hasMany('movie', {async: true})
});

App.Actor = App.Person.extend({

});

App.Director = App.Person.extend({
	
});

App.IndexRoute = Ember.Route.extend({
	model: function() {
		return this.store.find('movie');
	},
	setupController: function(controller, movies){
		this.controller.set('model', movies);
	}
});

App.IndexController = Ember.ArrayController.extend({
	comingSoonMovies: function(){
		return this.filter(function(movie){
			return movie.get('releaseDate') > new Date();
		});
	}.property('@each.releaseDate'),
	trendingMovies: function(){
		return this.filter(function(movie){
			var today = new Date();
			var twoMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 2, today.getDate());
			return movie.get('releaseDate') > twoMonthsAgo && movie.get('releaseDate') < today;			
		});
	}.property('@each.releaseDate'),
	topMovies: function(){
		return this.filter(function(movie){
			return movie.get('rating') > 8 && movie.get('releaseDate') < new Date();
		});
	}.property('@each.releaseDate', '@each.rating')
});

App.MovieRoute = Ember.Route.extend({
	model: function(params){
		return this.store.find('movie', params.movie_id);
	},
	actions:{
		addToWatchList: function(movie){
			this.controller.set('model.isInWatchList', true);			
		},
		removeFromWatchList: function(movie){
			this.controller.set('model.isInWatchList', false);			
		},
		edit: function(){
			this.controller.set('isEditMode', true);
		},
		done: function(){
			this.controller.set('isEditMode', false);
			var movie = this.currentModel;
			movie.save();
		}
	}
});

App.MovieController = Ember.ObjectController.extend({
	isEditMode: false
});

App.ActorRoute = Ember.Route.extend({
	model: function(params){
		return this.store.find('actor', params.actor_id);
	}
});

Ember.Handlebars.registerBoundHelper('stars', function(value, options) {
	var stars = $("<div/>");	
	for (var i = 0; i < value; i++) {
		$(stars).append('<small class="glyphicon glyphicon-star text-primary"></small>');
	};
	return new Handlebars.SafeString(stars.html());
});

App.DateField = Ember.TextField.extend({
	type: 'date',
	date: function(key, date) {
		if (date) {
			this.set('value', date.toISOString().substring(0, 10));
		} else {
			value = this.get('value');
			if (value) {
				date = new Date(value);
			} else {
				date = null;
			}
		}
		return date;
	}.property('value')
});

App.Movie.FIXTURES = [
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

App.Actor.FIXTURES = [
{
	id:1, firstName: " Dylan", lastName: "O'Brien", 
	image: "http://ia.media-imdb.com/images/M/MV5BNjY0NDE5MDQ5OF5BMl5BanBnXkFtZTcwMTI4MDQxOA@@._V1._SX290_SY379_.jpg", 
	bio: "Dylan O'Brien was born in New York City, to Lisa Rhodes, a former actress who also ran an acting school, and Patrick B. O'Brien, a camera operator",
	movies:[1]
},
{
	id:2, firstName: "Megan", lastName: "Fox", 
	image: "http://ia.media-imdb.com/images/M/MV5BMTc5MjgyMzk4NF5BMl5BanBnXkFtZTcwODk2OTM4Mg@@._V1__SX1303_SY615_.jpg", 
	bio: "Megan Denise Fox was born in Rockwood, Tennessee, to Gloria Darlene (Cisson) and Franklin Thomas Fox, a parole officer. Megan began her training in drama and dance at age 5 and, at age 10, moved to St. Petersburg, Florida where she continued her training and finished school.",
	movies:[2, 5, 6]
},
{
	id:3, firstName: "William", lastName: "Fichtner", 
	image: "http://ia.media-imdb.com/images/M/MV5BMTgyOTI3MzcxMF5BMl5BanBnXkFtZTcwNzIwNzQ3OQ@@._V1__SX1303_SY615_.jpg", 
	bio: "A small-town guy with a big heart, William Fichtner has been captivating the hearts of Western New Yorkers for decades. Bill was born in 1956 on Long Island, New York, to Patricia A. (Steitz) and William E. Fichtner",
	movies:[2, 3]
},
{
	id:4, firstName: "Christian", lastName: "Bale", 
	image: "http://ia.media-imdb.com/images/M/MV5BMTkxMzk4MjQ4MF5BMl5BanBnXkFtZTcwMzExODQxOA@@._V1__SX1303_SY615_.jpg", 
	bio: "Christian Charles Philip Bale was born in Pembrokeshire, Wales, UK on January 30, 1974, to English parents Jennifer 'Jenny' (James) and David Charles Howard Bale. His mother was a circus performer and his father, who was born in South Africa, was a commercial pilot.",
	movies:[3]
},
{
	id:5, firstName: "Heath", lastName: "Ledger", 
	image: "http://ia.media-imdb.com/images/M/MV5BMTI2NTY0NzA4MF5BMl5BanBnXkFtZTYwMjE1MDE0._V1__SX1303_SY615_.jpg", 
	bio: "When a hunky, twenty-year-old heart-throb Heath Ledger first came to the attention of the public in 1999, it was all too easy to tag him as a 'pretty boy' and an actor of little depth. He spent several years trying desperately to sway this image, but this was a double-edged sword.",
	movies:[3]
},
{
	id:6, firstName: "Morgan", lastName: "Freeman", 
	image: "http://ia.media-imdb.com/images/M/MV5BMTc0MDMyMzI2OF5BMl5BanBnXkFtZTcwMzM2OTk1MQ@@._V1__SX1303_SY615_.jpg", 
	bio: "With an authoritative voice and calm demeanor, this ever popular American actor has grown into one of the most respected figures in modern US cinema. Morgan was born in June 1937 in Memphis, Tennessee, to Mayme Edna (Revere), a teacher, and Morgan Porterfield Freeman, a barber.",
	movies:[4, 8]
},
{
	id:7, firstName: "Vin", lastName: "Diesel", 
	image: "http://ia.media-imdb.com/images/M/MV5BMTc0MDMyMzI2OF5BMl5BanBnXkFtZTcwMzM2OTk1MQ@@._V1__SX1303_SY615_.jpg", 
	bio: "Vin Diesel was born in New York City. He was raised by his astrologer/psychologist mother, Delora Sherleen (Sinclair), and adoptive father, Irving H. Vincent, an acting instructor and theater manager, in an artist's housing project in New York's Greenwich Village.",
	movies:[7]
},
{
	id:8, firstName: "Jennifer", lastName: "Lawrence", 
	image: "http://ia.media-imdb.com/images/M/MV5BMTM4OTY2MDY1M15BMl5BanBnXkFtZTcwNDYyNDM3NA@@._V1__SX1303_SY615_.jpg", 
	bio: "Academy Award-winning actress Jennifer Lawrence, best-known for playing Katniss Everdeen in The Hunger Games (2012), was born in Louisville, Kentucky on August 15, 1990, to Karen (Koch), who manages a children's camp, and Gary Lawrence, who works in construction.",
	movies:[9]
},
{
	id:9, firstName: "Tom", lastName: "McGrath", 
	image: "http://ia.media-imdb.com/images/M/MV5BNzU4NjU0MDEyNF5BMl5BanBnXkFtZTcwMjY0MzUwNA@@._V1__SX1303_SY615_.jpg", 
	bio: "Most popular as Skipper of Madagascar movies & the TV show, Penguins Of Madagascar & was a voice actor for Shrek 3 as Gary, Monsters vs Aliens as Wilson, Megamind as Lord Scott, & a bit part in Puss In Boots as a bar thief as well as being a director, layout & storyboard artist for numerous others.",
	movies:[10]
},
{
	id:10, firstName: "Martin", lastName: "Freeman", 
	image: "http://ia.media-imdb.com/images/M/MV5BMjE0MjAwOTMzMF5BMl5BanBnXkFtZTcwMDg1MjEyNw@@._V1__SX1303_SY615_.jpg", 
	bio: "Martin Freeman was born on September 8, 1971 in Aldershot, Hampshire, England.",
	movies:[11]
},
{
	id:11, firstName: "Ian", lastName: "McKellen", 
	image: "http://ia.media-imdb.com/images/M/MV5BMTQ2MjgyNjk3MV5BMl5BanBnXkFtZTcwNTA3NTY5Mg@@._V1__SX1303_SY615_.jpg", 
	bio: "Ian Murray McKellen was born on May 25, 1939 in Burnley, Lancashire, England, to Margery Lois (Sutcliffe) and Denis Murray McKellen, a civil engineer. He is of Scottish, Northern Irish, and English descent.",
	movies:[11]
}
];

App.Director.FIXTURES = [
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
>>>>>>> ember-data
