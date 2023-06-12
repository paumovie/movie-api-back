const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");

// tabla pivote: MoviesActors
Movie.belongsToMany(Actor, { through: 'MoviesActors' });
Actor.belongsToMany(Movie, { through: 'MoviesActors' });

// tabla pivote: MoviesDirectors
Movie.belongsToMany(Director, { through: 'MoviesDirectors' });
Director.belongsToMany(Movie, { through: 'MoviesDirectors' });

// table pivote: MoviesGenres
Movie.belongsToMany(Genre, { through: 'MoviesGenres' });
Genre.belongsToMany(Movie, { through: 'MoviesGenres' });


