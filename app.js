const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const methodOverride = require('method-override');
const app = express();
const reviews = require('./controllers/reviews')(app);
const comments = require('./controllers/comments')(app);

// const Review = require('./models/review');
const port = process.env.PORT || 3000;



mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.listen(port);
// app.use(bodyParser.urlencoded({ extended: true}));
// app.use(methodOverride('_method'));

module.exports = app;






// app.listen(3000, () => {
//     console.log('App listening on port 3000!');
// });
