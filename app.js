const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/rotten-potatoes');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

const Review = mongoose.model('Review', {
    title: String,
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

app.get('/', (req, res) => {
    Review.find()
        .then(reviews => {
            res.render('reviews-index', {reviews: reviews});
        })
        .catch(err => {
            console.log(err);
        })
})

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});
