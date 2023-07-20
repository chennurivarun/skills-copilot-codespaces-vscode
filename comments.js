// Create web server

// Import express
const express = require('express');
// Import body-parser
const bodyParser = require('body-parser');
// Import cors
const cors = require('cors');
// Import mongoose
const mongoose = require('mongoose');
// Import path
const path = require('path');
// Import config
const config = require('./config/database');
// Import passport
const passport = require('passport');

// Connect to database
mongoose.connect(config.database, { useNewUrlParser: true });

// On connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

// On error
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

// Create app
const app = express();

// Import users
const users = require('./routes/users');
// Import posts
const posts = require('./routes/posts');

// Port number
const port = 3000;

// CORS middleware
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Users route
app.use('/users', users);
// Posts route
app.use('/posts', posts);

// Index route
app.get('/', (req, res) => {
    res.send('Invalid endpoint');
});

// Start server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});