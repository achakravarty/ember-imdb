App = Ember.Application.create();

App.Router.map(function() {
	this.resource("movie", { path: "/movie/:movie_id" });
	this.resource("actor", { path: "/actor/:actor_id" });
	this.route("watchlist");
});

App.Movie = Ember.Object.extend({
	title: '',
	summary: '',
	releaseDate: '',
	releaseYear: function(){
		return new Date(this.get('releaseDate')).getFullYear();
	}.property('releaseDate'),
	actors: [],
	director: '',
	rating: '',
	image: '',
	trailer: ''
});

App.Person = Ember.Object.extend({
	firstName: '',
	lastName: '',
	bio: '',
	image: '',
	fullName: function(){
		return this.get('firstName') + " " + this.get('lastName');
	}.property('firstName', 'lastName')
});

App.Actor = App.Person.extend({
	
});

App.Director = App.Person.extend({
	
});

App.IndexRoute = Ember.Route.extend({
	model: function() {
		return Ember.$.getJSON('http://localhost:3000/movies').then(function(response){
			var movies = [];
			$.each(response.movies, function(index, movie){
				movies.push(translators.movieTranslator(movie));
			});
			return Ember.A(movies);
		});
	},
	setupController: function(controller, movies){
		controller.set('model', movies);
	}
});

App.IndexController = Ember.ArrayController.extend({
	comingSoonMovies: function(){
		return this.filter(function(movie){
			return new Date(movie.releaseDate) > new Date();
		});
	}.property('@each.releaseDate'),
	trendingMovies: function(){
		return this.filter(function(movie){
			var today = new Date();
			var twoMonthsAgo = new Date(today.getYear(), today.getMonth() - 2, today.getDate());
			return new Date(movie.releaseDate) > twoMonthsAgo && new Date(movie.releaseDate) < today;
			return new Date(movie.releaseDate) > new Date();
		});
	}.property('@each.releaseDate'),
	topMovies: function(){
		return this.filter(function(movie){
			return movie.rating > 4 && new Date(movie.releaseDate) < new Date();
		});
	}.property('@each.releaseDate', '@each.rating')
});

App.MovieRoute = Ember.Route.extend({
	model: function(params){
		return App.Movie.create({id: params.movie_id});
	},
	setupController: function(controller, movie){
		Ember.$.getJSON('http://localhost:3000/movies/' + movie.get('id')).then(function(response){
			controller.set('model', translators.movieTranslator(response.movie))
		});		
	},
	actions:{
		addToWatchList: function(movie){
			this.controller.set('model.isInWatchList', true);
			this.controller.get('watchlist').send('addToWatchlist', this.currentModel);
		},
		removeFromWatchList: function(movie){
			this.controller.set('model.isInWatchList', false);
			this.controller.get('watchlist').send('removeFromWatchlist', this.currentModel);
		}
	}
});

App.MovieController = Ember.ObjectController.extend({
	needs: 'watchlist',
	watchlist: Ember.computed.alias('controllers.watchlist')
});

App.ActorRoute = Ember.Route.extend({
	model: function(params){
		return App.Actor.create({id: params.actor_id});
	},
	setupController: function(controller, actor){
		Ember.$.getJSON('http://localhost:3000/actors/' + actor.get('id')).then(function(response){
			controller.set('model', translators.actorTranslator(response.actor))
		});
	}
});

App.WatchlistRoute = Ember.Route.extend({
	model: function(){
		return Ember.$.getJSON('http://localhost:3000/watchlist').then(function(response){
			var movies = [];
			$.each(response.watchlist, function(index, movie){
				movies.push(translators.movieTranslator(movie));
			});
			return Ember.A(movies);
		});
	}
});

App.WatchlistController = Ember.ArrayController.extend({
	addToWatchlist: function(movie){
		Ember.$.post('http://localhost:3000/watchlist/add', {'movie': JSON.stringify(movie)}).then(function(){
			alert('saved');
		});
	},
	removeFromWatchlist: function(movie){
		Ember.$.post('http://localhost:3000/watchlist/delete', {'movie': JSON.stringify(movie)}).then(function(){
			alert('saved');
		});
	}
});

Ember.Handlebars.registerBoundHelper('stars', function(value, options) {
	var stars = $("<div/>");	
	for (var i = 0; i < value; i++) {
		$(stars).append('<small class="glyphicon glyphicon-star text-primary"></small>');
	};
	return new Handlebars.SafeString(stars.html());
});

var translators = {
	movieTranslator : function(responseMovie){
		var that = this;
		var movie = App.Movie.create({
			id: responseMovie.id,
			title: responseMovie.title,
			summary: responseMovie.summary,
			releaseDate: responseMovie.releaseDate,
			rating: responseMovie.rating,
			//image: responseMovie.image,
			image: "http://www.cinemark.com/media/19383200/big.jpg",			
			trailer: responseMovie.trailer
		});

		movie.set('director', this.directorTranslator(responseMovie.director));

		movie.set('actors', Ember.A([]));
		
		$.each(responseMovie.actors, function(i, actor){
			var act = that.actorTranslator(actor);
			movie.get('actors').pushObject(act);
		});
		
		return movie;
	},
	actorTranslator : function(responseActor){
		var actor = App.Actor.create({
			id: responseActor.id,
			firstName: responseActor.firstName,
			lastName: responseActor.lastName,
			bio: responseActor.bio,
			image: responseActor.image
		});	

		var movies = [];
		$.each(responseActor.movies, function(index, movie){
			movies.push(translators.movieTranslator(movie));
		});
		actor.set('movies', Ember.A(movies));
		return actor;
	},
	directorTranslator : function(responseDirector){
		var director = App.Director.create({
			id: responseDirector.id,
			firstName: responseDirector.firstName,
			lastName: responseDirector.lastName,
			bio: responseDirector.bio,
			image: responseDirector.image
		});	
		var movies = [];
		$.each(responseDirector.movies, function(index, movie){
			movies.push(translators.movieTranslator(movie));
		});
		director.set('movies', Ember.A(movies));	
		return director;
	}
};