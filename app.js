const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const app = express();
const reviews = require('./controllers/reviews')(app);
const comments = require('./controllers/comments')(app);
const movies = require('./controllers/movies')(app);


const port = process.env.PORT || 3000;



mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.listen(port);


module.exports = app;
