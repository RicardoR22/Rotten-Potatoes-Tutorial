const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();

mongoose.connect('mongodb://localhost/rotten-potatoes');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(methodOverride('_method'))

const Review = mongoose.model('Review', {
    title: String,
    description: String,
    movieTitle: String,
    rating: Number
});

// let reviews = [
//     {title: "Great Review", movieTitle: "Ironman"},
//     {title: "Awesome Movie", movieTitle: "The Avengers"},
//     {title: "Awesome Movie", movieTitle: "Guardians of the Galaxy"}
// ]


// app.get('/', (req, res) => {
//     res.render('home', {msg: 'Handlebars are cool!'});
// });


// Index
app.get('/', (req, res) => {
    Review.find()
        .then(reviews => {
            res.render('reviews-index', {reviews: reviews});
        })
        .catch(err => {
            console.log(err);
        })
})

// New
app.get('/reviews/new', (req, res) => {
    res.render('reviews-new', {});
})

// Show
app.get('/reviews/:id', (req, res) => {
    Review.findById(req.params.id).then((review) => {
        res.render('reviews-show', {review: review});
    }).catch((err) => {
        console.log(err.message);
    })
})

// Create
app.post('/reviews', (req, res) => {
    Review.create(req.body).then(review => {
        console.log(review);
        res.redirect('/reviews/'+ review._id);
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
    Review.findByIdAndUpdate(req.params.id, req.body).then(review => {
        res.redirect('/reviews/'+ review._id);
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



app.listen(3000, () => {
    console.log('App listening on port 3000!');
});
