// controllers/reviews.js
const Review = require('../models/review');
const Comment = require('../models/comment');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');



module.exports = function(app) {
    app.use(bodyParser.urlencoded({ extended: true}));
    app.use(methodOverride('_method'));
    //Index
    app.get('/', (req, res) => {
        Review.find().then(reviews => {
            res.render('reviews-index', {reviews: reviews});
        }).catch(err => {
            console.log(err.message);
        })
    })

    //New
    app.get('/reviews/new', (req, res) => {
        res.render('reviews-new', {});
    })
    // Show
    app.get('/reviews/:id', (req, res) => {
        Review.findById(req.params.id).then((review) => {
            // fetch its comments
            Comment.find({ reviewId: req.params.id }).then(comments => {
                //respond with the template with both values
                res.render('reviews-show', {review: review, comments: comments});
            })
        }).catch((err) => {
            console.log(err.message);
        })
    })

    // Create
    app.post('/reviews', (req, res) => {
        Review.create(req.body).then(review => {
            console.log(review);
            res.redirect(`/reviews/${review._id}`);
        }).catch(err => {
            console.log(err.message);
        })
    })

    // Edit
    app.get('/reviews/:id/edit', (req, res) => {
        Review.findById(req.params.id).then((review) => {
            res.render('reviews-edit', {review: review});
        })
    })

    // Update
    app.put('/reviews/:id', (req, res) => {
        Review.findByIdAndUpdate(req.params.id, req.body).then((review) => {
            res.redirect(`/reviews/${review._id}`);
        }).catch((err) => {
            console.log(err.message);
        })
    })

    // DELETE
    app.delete('/reviews/:id', (req, res) => {
        console.log("DELETE review");
        Review.findByIdAndRemove(req.params.id).then((review) => {
            res.redirect('/');
        }).catch((err) => {
            console.log(err.message);
        })
    })

}
