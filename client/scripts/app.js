App = Ember.Application.create();

App.Router.map(function() {
	this.resource("movie", { path: "/movie/:movie_id" });
	this.resource("actor", { path: "/actor/:actor_id" });
});

DS.RESTAdapter.reopen({
	host: 'http://localhost:3000'
})

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
<<<<<<< HEAD
			return new Date(movie.releaseDate) > twoMonthsAgo && new Date(movie.releaseDate) < today;
			return new Date(movie.releaseDate) > new Date();
=======
			return movie.get('releaseDate') > twoMonthsAgo && movie.get('releaseDate') < today;			
>>>>>>> ember-data
		});
	}.property('@each.releaseDate'),
	topMovies: function(){
		return this.filter(function(movie){
<<<<<<< HEAD
			return movie.rating > 8 && new Date(movie.releaseDate) < new Date();
=======
			return movie.get('rating') > 8 && movie.get('releaseDate') < new Date();
>>>>>>> ember-data
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
<<<<<<< HEAD
=======
		},
		edit: function(){
			this.controller.set('isEditMode', true);
		},
		done: function(){
			this.controller.set('isEditMode', false);
			var movie = this.currentModel;
			movie.save();
>>>>>>> ember-data
		}
	}
});

<<<<<<< HEAD
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
=======
App.MovieController = Ember.ObjectController.extend({
	isEditMode: false
});

App.ActorRoute = Ember.Route.extend({
	model: function(params){
		return this.store.find('actor', params.actor_id);
>>>>>>> ember-data
	}
});

Ember.Handlebars.registerBoundHelper('stars', function(value, options) {
	var stars = $("<div/>");	
	for (var i = 0; i < value; i++) {
		$(stars).append('<small class="glyphicon glyphicon-star text-primary"></small>');
	};
	return new Handlebars.SafeString(stars.html());
});

<<<<<<< HEAD
var translators = {
	movieTranslator : function(responseMovie){
		var that = this;
		var movie = App.Movie.create({
			id: responseMovie.id,
			title: responseMovie.title,
			summary: responseMovie.summary,
			releaseDate: responseMovie.releaseDate,
			rating: responseMovie.rating,
			image: responseMovie.image,
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
=======
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
>>>>>>> ember-data
