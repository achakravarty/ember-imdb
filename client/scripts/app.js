$(document).ready(function(){

	var Movie = function(){		
		this.id = '',
		this.title = '';
		this.summary = '';
		this.releaseDate = '';
		this.actors = [];
		this.director = '';
		this.rating = '';
		this.image = '';
		this.trailer = '';
		this.stars = '';
		this.hasLoaded = false;
	};

	var Actor = function(){
		this.firstName = '';
		this.lastName = '';
		this.movies = [];
		this.hasLoaded = false;
	};

	var Director = function(){
		this.firstName = '';
		this.lastName = '';
		this.movies = [];
		this.hasLoaded = false;
	};

	var allMovies = [];
	
	var loadAllMovies = function(){
		ajax.getAll("http://localhost:3000/movies", function(response){
			var movies = [];
			$.each(response.movies, function(index, mov){
				var movie = translators.movieTranslator(mov);
				movies.push(movie);
			});
			allMovies = movies;
			categorize();
		}, function(){});
	};

	var loadMovie = function(movieId){
		ajax.get("http://localhost:3000/movies", movieId, function(response){
			var movie = translators.movieTranslator(response.movie);
			displayMovie(movie);
		}, function(){});
	};

	var loadActor = function(actorId){
		ajax.get("http://localhost:3000/actors", actorId, function(response){
			var actor = translators.actorTranslator(response.actor);			
		}, function(){});		
	};

	var loadDirector = function(directorId){
		ajax.get("http://localhost:3000/directors", directorId, function(response){
			var director = translators.directorTranslator(response.director);
		}, function(){});		
	};

	var translators = {
		movieTranslator : function(responseMovie){
			var that = this;
			var movie = new Movie();
			movie.id = responseMovie.id;
			movie.title = responseMovie.title;
			movie.summary = responseMovie.summary;
			movie.releaseDate = new Date(responseMovie.releaseDate);
			movie.rating = responseMovie.rating;
			movie.image = responseMovie.image;
			var stars = $("<div/>");	
			for (var i = 0; i < responseMovie.rating; i++) {
				$(stars).append('<small class="glyphicon glyphicon-star text-primary"></small>');
			};
			movie.stars = stars;
			movie.trailer = responseMovie.trailer;

			var director = this.directorTranslator(responseMovie.director);
			movie.director = director;

			$.each(responseMovie.actors, function(i, actor){
				var act = that.actorTranslator(actor);
				movie.actors.push(act);
			});
			return movie;
		},
		actorTranslator : function(responseActor){
			var actor = new Actor();
			actor.firstName = responseActor.firstName;
			actor.lastName = responseActor.lastName;
			actor.image = responseActor.image;
			return actor;
		},
		directorTranslator : function(responseDirector){
			var director = new Director();
			director.firstName = responseDirector.firstName;
			director.lastName = responseDirector.lastName;
			director.image = responseDirector.image;
			return director;
		}
	};

	var categorize = function(){
		var comingSoonMovies = $.grep(allMovies, function(movie){
			return movie.releaseDate > new Date();
		});
		var trendingMovies = $.grep(allMovies, function(movie){
			var today = new Date();
			var twoMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 2, today.getDate());
			return movie.releaseDate > twoMonthsAgo && movie.releaseDate < today;
		});
		var topMovies = $.grep(allMovies, function(movie, index){
			return movie.rating > 8 && movie.releaseDate < new Date();
		});
		showComingSoonMovies(comingSoonMovies);
		showTrendingMovies(trendingMovies);
		showTopMovies(topMovies);
		bindEvents();
	};

	var showComingSoonMovies = function(comingSoonMovies){
		$.each(comingSoonMovies, function(i, movie){
			var div = 
			'<div class="col-md-4">' +
			'<div id="movie_' + movie.id + '" class="text-center jMovie" style="cursor:pointer">' +
			'<img src="' + movie.image + '" style="height:300px;width:200px"></img>' +
			'<h4>' + movie.title + ' <small class="text-info">(' + movie.releaseDate.getFullYear() + ')</small></h4>' +
			'</div>' +
			'</div>';
			$('#comingSoon').append(div);
		});
	};

	var showTrendingMovies = function(trendingMovies){
		var div = $('<div class="list-group"/>');
		$.each(trendingMovies, function(i, movie){
			div.append(
				'<a id="movie_' + movie.id + '" href="movie.html?movie=' + movie.id + '" class="list-group-item">' + 
				movie.title +
				'</a>');	
		});
		$('#trending').html(div);
	};

	var showTopMovies = function(topMovies){
		$.each(topMovies, function(i, movie){
			var div =
			'<div class="col-md-2">' +
			'<div id="movie_' + movie.id + '" class="text-center jMovie" style="cursor:pointer">' +
			'<img src="' + movie.image + '" style="height:200px;width:150px"></img>' +
			'<h4>' + movie.title + ' <small class="text-info">(' + movie.releaseDate.getFullYear() + ')</small></h4>' +						
			'</div>' +
			'</div>';
			var $div = $(div);
			$("div", $div).append(movie.stars);
			$('#top').append($div);
		});
	};

	var bindEvents = function(){
		$(".jMovie").click(function(){
			window.location.href = "movie.html?movie=" + this.id.substring(6);
		});
	};

	var displayMovie = function(movie){
		var actors = $('<div/>');
		$.each(movie.actors, function(i, actor){
			actors.append(
				'<div class="media">' +
				'<a class="pull-left">' +
				'<img class="media-object" src="' + actor.image + '" style="height:50px; width:40px;">' +
				'</a>' +
				'<div class="media-body">' +
				'<div class="media-heading">' +
				'<a href="#" class="">' + 
				'<h4>' + actor.firstName + ' ' + actor.lastName + '</h4>' +
				'</br>' +				
				'</a>' +
				'</div>' +
				'</div>' +
				'</div>');
		});

		var moviePanel = 
		'<div class="panel-heading">' +
		'<h4 class="panel-title">Movie</h4>' +
		'</div>' +
		'<div class="panel-body">' +
		'<div class="col-md-3">' +
		'<img src="' + movie.image + '" style="height:300px;width:200px"/>' +
		'</div>' +
		'<div class="col-md-5">' +
		'<h2 class="page-header">' + movie.title + ' ' +
		'<small class="text-muted">(' + movie.releaseDate.getFullYear() + ')</small>' +
		'<span class="pull-right">' + movie.stars.html() + '</span>' +
		'</h2>' +
		'<div>' + movie.summary + 
		'</div>' +
		'<div>' +
		'<strong class="text-muted">Director: </strong>' + 
		movie.director.firstName + ' ' + movie.director.lastName + 
		'</div>' +
		'<div class="btn-group" style="margin-top:20px">' +
		'<button class="btn btn-warning"><span class="glyphicon glyphicon-plus"></span></button>' +
		'<button class="btn btn-warning">Watchlist</button>' +
		'</div>' +
		'</div>' +
		'<div class="col-md-4">' +
		'<div class="panel panel-info">' + 
		'<div class="panel-heading">' +
		'<h4 class="panel-title">Cast</h4>' +
		'</div>' +
		'<div class="panel-body">' +
		$(actors).html() +
		'</div>' +
		'</div>' +
		'</div>' +
		'</div>';

		$("#movie").append(moviePanel);
	};

	var ajax = {
		getAll: function(url, success, failure){
			$.ajax({
				url: url,
				type: 'GET'
			})
			.done(success)
			.fail(failure);
		},
		get: function(url, id, success, failure){
			$.ajax({
				url: url + "/" + id,
				type: 'GET'
			})		
			.done(success)
			.fail(failure);
		}
	}

	var query = window.location.search.substring(1);
	console.log(query);
	if(typeof query == 'string' && !query == false){
		var param = query.split("=");
		var movieId = param[1];
		loadMovie(movieId);
	}
	else{
		loadAllMovies();	
	}
	
});