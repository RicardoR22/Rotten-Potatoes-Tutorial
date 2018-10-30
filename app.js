const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect('mongodb://localhost/rotten-potatoes');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true}));

const Review = mongoose.model('Review', {
    title: String,
    description: String,
    movieTitle: String
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

// Create
app.post('/reviews', (req, res) => {
    Review.create(req.body).then((review) => {
        console.log(review);
        res.redirect('/');
    }).catch((err) => {
        console.log(err.message);
    })
})


app.listen(3000, () => {
    console.log('App listening on port 3000!');
});
