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
			var twoMonthsAgo = new Date(today.getYear(), today.getMonth() - 2, today.getDate());
			return movie.get('releaseDate') > twoMonthsAgo && movie.get('releaseDate') < today;			
		});
	}.property('@each.releaseDate'),
	topMovies: function(){
		return this.filter(function(movie){
			return movie.get('rating') > 4 && movie.get('releaseDate') < new Date();
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
		}
	}
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