exports.get = function(req, res){
	var actorId = req.params.actor_id;
	res.send({actor:actorFixtures[actorId - 1]});
};

actorFixtures = [
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