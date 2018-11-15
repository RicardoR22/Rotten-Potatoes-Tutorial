// controllers/reviews.js
const Review = require('../models/review');
const Comment = require('../models/comment');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');



module.exports = function(app) {
    app.use(bodyParser.urlencoded({ extended: true}));
    app.use(methodOverride('_method'));
    //Index
    // app.get('/', (req, res) => {
    //     Review.find().then(reviews => {
    //         res.render('reviews-index', {reviews: reviews});
    //     }).catch(err => {
    //         console.log(err.message);
    //     })
    // })

    //New
    app.get('/movies/:movieId/reviews/new', (req, res) => {
        res.render('reviews-new', {movieId: req.params.movieId});
    })
    // Show
    app.get('/movies/:movieId/reviews/:id', (req, res) => {
        Review.findById(req.params.id).then((review) => {
            // fetch its comments
            res.render('reviews-show', {review: review})
            // Comment.find({ reviewId: req.params.id }).then(comments => {
            //     //respond with the template with both values
            //     res.render('reviews-show', {review: review, comments: comments});
            // })
        }).catch((err) => {
            console.log(err.message);
        })
    })

    // Create
    app.post('/movies/:movieId/reviews', (req, res) => {
        console.log(req.body)
        Review.create(req.body).then(review => {
            console.log(review);
            res.redirect(`/movies/${review.movieId}`);
        }).catch(err => {
            console.log(err.message);
        })
    })

    // Edit
    app.get('/movies/:movieId/reviews/:id/edit', (req, res) => {
        Review.findById(req.params.id).then((review) => {
            console.log("review found")
            res.render('reviews-edit', {review: review});
        })
    })

    // Update
    app.put('/movies/:movieId/reviews/:id', (req, res) => {
        Review.findByIdAndUpdate(req.params.id, req.body).then((review) => {
            res.redirect(`/movies/${review.movieId}`);
        }).catch((err) => {
            console.log(err.message);
        })
    })

    // DELETE
    app.delete('/movies/:movieId/reviews/:id', (req, res) => {
        console.log("DELETE review");
        Review.findByIdAndRemove(req.params.id).then((review) => {
            res.redirect(`/movies/${review.movieId}`);
        }).catch((err) => {
            console.log(err.message);
        })
    })

}
