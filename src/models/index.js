const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");

// tabla pivote: MoviesActors
Movie.belongsToMany(Actor, { through: 'MoviesGenres' });
Actor.belongsToMany(Movie, { through: 'MoviesGenres' });

// tabla pivote: MoviesDirectors
Movie.belongsToMany(Director, { through: 'MoviesGenres' });
Director.belongsToMany(Movie, { through: 'MoviesGenres' });

// table pivote: MoviesGenres
Movie.belongsToMany(Genre, { through: 'MoviesGenres' });
Genre.belongsToMany(Movie, { through: 'MoviesGenres' });


