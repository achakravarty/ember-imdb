$(document).ready(function(){

	var Movie = function(){		
		this.title = '';
		this.summary = '';
		this.releaseDate = '';
		this.actors = [];
		this.director = '';
		this.rating = '';
		this.image = '';
		this.trailer = '';
		this.update = function(){
			if(director.hasLoaded){

			}
		}
	};

	var Actor = function(){
		this.firstName = '';
		this.lastName = '';
		this.movies = [];
	};

	var Director = function(){
		this.firstName = '';
		this.lastName = '';
		this.movies = [];
	};

	var allMovies = [];
	
	var update = function(){
		var hasLoaded = false;
		$.each(allMovies, function(index, movie){
			if(movie.director.hasLoaded){
				$.each(movie.actors, function(i, actor){
					if(actor.hasLoaded){
						hasLoaded = true;
					}
					else{
						hasLoaded = false;
						return false;
					}
				});				
			}
			else{
				hasLoaded = false;
				return false;
			}
		});
		if(hasLoaded){
			console.log(allMovies);
			var comingSoonMovies = $.grep(allMovies, function(movie){
				return movie.releaseDate > new Date();
			});
			var trendingMovies = $.grep(allMovies, function(movie){
				var date = new Date();
				return movie.releaseDate < date.setMonth(date.getMonth() - 2);
			});
			var topMovies = $.grep(allMovies, function(movie, index){
				return movie.rating > 8;
			});
			showComingSoonMovies(comingSoonMovies);
			showTrendingMovies();
			showTopMovies();
		}
	};

	var showComingSoonMovies = function(comingSoonMovies){
		$.each(comingSoonMovies, function(i, movie){
			$('#comingSoon').html("<div>"+ movie.title +"</div>");
		});
	}

	var showTrendingMovies = function(trendingMovies){
		$.each(trendingMovies, function(i, movie){
			$('#trending').html("<div>"+ movie.title +"</div>");
		});
	}

	var showTopMovies = function(topMovies){
		$.each(topMovies, function(i, movie){
			$('#top').html("<div>"+ movie.title +"</div>");
		});
	}

	var loadAllMovies = function(){
		ajax.getAll("http://localhost:3000/movies", function(response){
			var movies = [];
			$.each(response.movies, function(index, mov){
				var movie = new Movie();
				movie.title = mov.title;
				movie.summary = mov.summary;
				movie.releaseDate = mov.releaseDate;
				movie.rating = mov.rating;
				movie.image = mov.image;
				movie.trailer = mov.trailer;
				movie.director = new Director();
				loadDirector(mov.director, function(dir){
					allMovies[index].director = dir;
					allMovies[index].director.hasLoaded = true;
					update();
				});

				$.each(mov.actors, function(i, actor){
					movie.actors.push(new Actor());
					loadActor(actor, function(act){
						act.hasLoaded = true;
						allMovies[index].actors[i] = act;
						update();
					});
				});
				movies.push(movie);
			});
			allMovies = movies;
		}, function(){});
	};

	var loadMovie = function(movieId){
		ajax.get("http://localhost:3000/movies", movieId, function(response){
			var movie = new Movie();
			movie.title = response.movie.title;
			movie.summary = response.movie.summary;
			movie.releaseDate = response.movie.releaseDate;
			movie.rating = response.movie.rating;
			movie.image = response.movie.image;
			movie.trailer = response.movie.trailer;
			loadDirector(response.movie.director, function(dir){
				movie.director = dir;
			});

			$.each(response.movie.actors, function(actor){
				loadActor(actor, function(act){
					movie.actors.push(act);
				});
			});
		}, function(){});
	};

	var loadActor = function(actorId, success){
		ajax.get("http://localhost:3000/actors", actorId, function(response){
			var actor = new Actor();
			actor.firstName = response.actor.firstName;
			actor.lastName = response.actor.lastName;
			success(actor);
		}, function(){});		
	};

	var loadDirector = function(directorId, success){
		ajax.get("http://localhost:3000/directors", directorId, function(response){
			var director = new Director();
			director.firstName = response.director.firstName;
			director.lastName = response.director.lastName;
			success(director);
		}, function(){});		
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

	loadAllMovies();
});