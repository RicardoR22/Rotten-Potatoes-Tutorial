// movies.js
const MovieDb = require('moviedb-promise');
const moviedb = new MovieDb('44df7b58249b0e2cf21d3c8c9c38256e')
const Review = require('../models/review');


module.exports = function(app) {
    //Index
    app.get('/', (req, res) => {
        moviedb.miscNowPlayingMovies().then(response => {
            res.render('movies-index', {movies: response.results});
        }).catch(console.error);

    });

    //Show
    app.get('/movies/:id', (req, res) => {
        moviedb.movieInfo({id: req.params.id}).then(movie => {

            // Find this Movie's Reviews
            Review.find({movieId: req.params.id}).then(reviews => {
                // Then render the movies-show template
                moviedb.movieTrailers({id: req.params.id}).then(videos => {
                    movie.trailer_youtube_id = videos.youtube[0].source
                    console.log('VIDEOS.TRAILER_YOUTUBE_ID', videos.trailer_youtube_id);

                    res.render('movies-show', {movie: movie, reviews: reviews});

                }).catch(console.error);
            }).catch(console.error);
        })
    })

}
