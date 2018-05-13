const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
const posts = require('./routes/api/posts');

const app = express();

// Body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// DB Config
const dbCloud = require('./config/keys').mongoURI;
const dbLocal = 'mongodb://localhost/devconnector';

// Connect to MongoDB
mongoose.connect(dbLocal)   // Connect to local DB if running
  .then(() => console.log("Connected to local MongoDB"))
  .catch(() => {
    mongoose.connect(dbCloud)
      .then(() => console.log("Connected to MLab MongoDB"))
      .catch(err => console.log(err));
  });

app.get('/', (req, res) => res.send("Hello world"));

// Use Routes
app.use('/api/users', users);
app.use('/api/profiles', profiles);
app.use('/api/posts', posts);


const port = process.env.PORT || 5000;    // heroku or local:5000

app.listen(port, () => console.log(`Server running on port ${port}`));